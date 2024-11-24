
import UserAssessmentHistory from "../models/assessment.model.js";
import LeaderBoard from "../models/leaderboard.model.js";


export const getLeaderboardByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const leaderboard = await LeaderBoard.find({ category }).sort({ score: -1 });
        res.status(200).json({ leaderboard });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", error })
    }
}

export const getCombineCategoryLeaderboard = async (req, res) => {
    try {
        // get all unique users from leaderboard
        const users = await LeaderBoard.find().distinct('userId');

        // get all categories of each userId and calculate total score
        const leaderboard = [];
        await Promise.all(users.map(async (userId) => {
            const userCategories = await LeaderBoard.find({ userId });
            const username = userCategories[0].username;
            const totalScore = userCategories.reduce((acc, curr) => acc + curr.score, 0);
            leaderboard.push({ username, score:totalScore });
        }));


        res.status(200).json({ leaderboard:leaderboard.sort((a, b) => b.totalScore - a.totalScore) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", error })
    }
}

const fetchAllLeaderboardRanks = async (userId) => {
    const allCategoryRanksOfUser = await LeaderBoard.find({ userId });

    const rankMapping = {};

    allCategoryRanksOfUser.forEach(categoryRank => {
        rankMapping[categoryRank.category] = categoryRank.score;
    })

    return rankMapping;
}

export const updateLeaderBoard = async (userId, username, lastAttemptNumber) => {
    try {
        const latestAttemptRound = await UserAssessmentHistory.findOne({ userId })
            .sort({ attemptNumber: -1 });

        console.log("=== latestAttemptRound ===", latestAttemptRound);

        if (lastAttemptNumber === 0) {
            await Promise.all(latestAttemptRound.assessments.map(async (assessment) => {
                const newRank = new LeaderBoard({
                    userId,
                    username,
                    score: assessment.totalScore,
                    category: assessment.categoryId
                })
                await newRank.save();
            }))

        } else {
            const leaderboardRanks = await fetchAllLeaderboardRanks(userId);

            latestAttemptRound.assessments.forEach(assessment => {
                const category = assessment.categoryId;
                const newScore = assessment.totalScore;

                // If your attempt was the highest it will remain the highest
                if (leaderboardRanks[category] !== undefined) {
                    if (newScore > leaderboardRanks[category]) {
                        leaderboardRanks[category] = newScore;
                    }
                } else {
                    leaderboardRanks[category] = newScore;
                }
            });

            await Promise.all(Object.keys(leaderboardRanks).map(async (category) => {
                const score = leaderboardRanks[category];
                await LeaderBoard.updateOne(
                    { userId, category }, // filter to find the specific leaderboard entry for the user and category.
                    { userId, username, score, category },
                    { upsert: true }
                );
            }))
        }
    } catch (error) {
        console.log({ error });
    }
}
