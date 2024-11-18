
import UserAssessmentHistory from "../models/assessment.model.js";
import LeaderBoard from "../models/leaderboard.model.js";

export const getLeaderboard = async (req, res) => {
    try {
        const category = req.params.category;
        const leaderboard = await LeaderBoard.find({category}).sort({score: -1});
        res.status(200).json({leaderboard});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error", error})
    }
}

const fetchAllLeaderboardRanks = async (userId) => {
    const allCategoryRanksOfUser = await LeaderBoard.find({userId});

    const rankMapping = {};

    allCategoryRanksOfUser.forEach(categoryRank => {
        rankMapping[categoryRank.category] = categoryRank.score;
    })

    return rankMapping;
}

export const updateLeaderBoard = async (userId, username, lastAttemptNumber) => {
    try {
        const latestAttemptRound = await UserAssessmentHistory.findOne({userId})
            .sort({attemptNumber: -1});

        const overallScore = latestAttemptRound.overallScore;

        const categoryMapping = {
            "6720b4b7138ac4c27924dbf2": "physical",
            "6722653e8aebf1c473d1672b": "mental",
            "67226bc38dec3d17c5368bd2": "diet",
            "67226bdf8dec3d17c5368bd5": "lifestyle"
        };

        if (lastAttemptNumber === 0) {
            await Promise.all(latestAttemptRound.assessments.map(async (assessment) => {
                const newRank = new LeaderBoard({
                    userId,
                    username,
                    score: assessment.totalScore,
                    category: categoryMapping[assessment.categoryId]
                })
                await newRank.save();
            }))

            const newOverallRank = new LeaderBoard({
                userId,
                username,
                score: overallScore,
                category: "overall"
            })
            const savedRank = await newOverallRank.save()
        } else {
            const leaderboardRanks = await fetchAllLeaderboardRanks(userId);

            latestAttemptRound.assessments.forEach(assessment => {
                const category = categoryMapping[assessment.categoryId];
                const newScore = assessment.totalScore;

                if (leaderboardRanks[category] !== undefined) {
                    if (newScore > leaderboardRanks[category]) {
                        leaderboardRanks[category] = newScore;
                    }
                } else {
                    leaderboardRanks[category] = newScore;
                }
            });

            if (overallScore > (leaderboardRanks["overall"] || 0)) {
                leaderboardRanks["overall"] = overallScore;
            }

            await Promise.all(Object.keys(leaderboardRanks).map(async (category) => {
                const score = leaderboardRanks[category];
                const updatedRank = await LeaderBoard.updateOne(
                    {userId, category}, // filter to find the specific leaderboard entry for the user and category.
                    {userId, username, score, category},
                    {upsert: true}
                );
            }))
        }
    } catch (error) {
        console.log({error});
    }
}