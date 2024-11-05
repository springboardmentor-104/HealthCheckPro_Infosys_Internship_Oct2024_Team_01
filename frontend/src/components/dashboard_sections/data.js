const data = [
    {
        categoryName: "Diet",
        description: "Questions related to dietary habits",
        totalScore: 25,
        questions: [
            {
                _id: "1",
                questionText: "How many servings of fruits and vegetables do you eat per day?",
                selectedOption: null,
                options: [
                    { optionId: "1A", optionText: "Less than 1 serving", score: 1 },
                    { optionId: "1B", optionText: "1 serving", score: 2 },
                    { optionId: "1C", optionText: "2 servings", score: 3 },
                    { optionId: "1D", optionText: "3-4 servings", score: 4 },
                    { optionId: "1E", optionText: "5 or more servings", score: 5 }
                ]
            },
            {
                _id: "2",
                questionText: "How often do you consume fast food or processed snacks?",
                selectedOption: null,
                options: [
                    { optionId: "2A", optionText: "Every day", score: 1 },
                    { optionId: "2B", optionText: "Several times a week", score: 2 },
                    { optionId: "2C", optionText: "Once a week", score: 3 },
                    { optionId: "2D", optionText: "Rarely", score: 4 },
                    { optionId: "2E", optionText: "Never", score: 5 }
                ]
            },
            {
                _id: "3",
                questionText: "How much water do you drink per day?",
                selectedOption: null,
                options: [
                    { optionId: "3A", optionText: "Less than 2 cups", score: 1 },
                    { optionId: "3B", optionText: "2-4 cups", score: 2 },
                    { optionId: "3C", optionText: "4-6 cups", score: 3 },
                    { optionId: "3D", optionText: "8-10 cups", score: 4 },
                    { optionId: "3E", optionText: "More than 10 cups", score: 5 }
                ]
            },
            {
                _id: "4",
                questionText: "How often do you eat breakfast?",
                options: [
                    { optionId: "4A", optionText: "Rarely or never", score: 1 },
                    { optionId: "4B", optionText: "1-2 times a week", score: 2 },
                    { optionId: "4C", optionText: "3-4 times a week", score: 3 },
                    { optionId: "4D", optionText: "Most days", score: 4 },
                    { optionId: "4E", optionText: "Every day", score: 5 }
                ]
            },
            {
                _id: "5",
                questionText: "How often do you consume sugary drinks (soda, juice, etc.)?",
                options: [
                    { optionId: "5A", optionText: "Several times a day", score: 1 },
                    { optionId: "5B", optionText: "Once a day", score: 2 },
                    { optionId: "5C", optionText: "A few times a week", score: 3 },
                    { optionId: "5D", optionText: "Rarely", score: 4 },
                    { optionId: "5E", optionText: "Never", score: 5 }
                ]
            }
        ]
    },
    {
        categoryName: "Mental Well-being",
        description: "Questions related to mental health and well-being",
        totalScore: 25,
        questions: [
            {
                _id: "1",
                questionText: "How often do you feel stressed or anxious?",
                options: [
                    { optionId: "1A", optionText: "Every day", score: 1 },
                    { optionId: "1B", optionText: "Several times a week", score: 2 },
                    { optionId: "1C", optionText: "Occasionally", score: 3 },
                    { optionId: "1D", optionText: "Rarely", score: 4 },
                    { optionId: "1E", optionText: "Never", score: 5 }
                ]
            },
            {
                _id: "2",
                questionText: "How often do you feel rested after sleep?",
                options: [
                    { optionId: "2A", optionText: "Never", score: 1 },
                    { optionId: "2B", optionText: "Occasionally", score: 2 },
                    { optionId: "2C", optionText: "Sometimes", score: 3 },
                    { optionId: "2D", optionText: "Most of the time", score: 4 },
                    { optionId: "2E", optionText: "Always", score: 5 }
                ]
            },
            {
                _id: "3",
                questionText: "How often do you engage in activities that help you relax (e.g., hobbies, meditation)?",
                options: [
                    { optionId: "3A", optionText: "Never", score: 1 },
                    { optionId: "3B", optionText: "Rarely", score: 2 },
                    { optionId: "3C", optionText: "Once a week", score: 3 },
                    { optionId: "3D", optionText: "A few times a week", score: 4 },
                    { optionId: "3E", optionText: "Every day", score: 5 }
                ]
            },
            {
                _id: "4",
                questionText: "How would you rate your overall mood in the past week?",
                options: [
                    { optionId: "4A", optionText: "Very poor", score: 1 },
                    { optionId: "4B", optionText: "Poor", score: 2 },
                    { optionId: "4C", optionText: "Neutral", score: 3 },
                    { optionId: "4D", optionText: "Good", score: 4 },
                    { optionId: "4E", optionText: "Excellent", score: 5 }
                ]
            },
            {
                _id: "5",
                questionText: "How often do you feel supported by family or friends?",
                options: [
                    { optionId: "5A", optionText: "Never", score: 1 },
                    { optionId: "5B", optionText: "Rarely", score: 2 },
                    { optionId: "5C", optionText: "Sometimes", score: 3 },
                    { optionId: "5D", optionText: "Often", score: 4 },
                    { optionId: "5E", optionText: "Always", score: 5 }
                ]
            }
        ]
    },
    {
        categoryName: "Lifestyle",
        description: "Questions related to lifestyle habits",
        totalScore: 25,
        questions: [
            {
                _id: "1",
                questionText: "How many hours of sleep do you get per night?",
                options: [
                    { optionId: "1A", optionText: "Less than 4 hours", score: 1 },
                    { optionId: "1B", optionText: "4-5 hours", score: 2 },
                    { optionId: "1C", optionText: "6 hours", score: 3 },
                    { optionId: "1D", optionText: "7-8 hours", score: 4 },
                    { optionId: "1E", optionText: "More than 8 hours", score: 5 }
                ]
            },
            {
                _id: "2",
                questionText: "How often do you consume alcohol?",
                options: [
                    { optionId: "2A", optionText: "Every day", score: 1 },
                    { optionId: "2B", optionText: "Several times a week", score: 2 },
                    { optionId: "2C", optionText: "Once a week", score: 3 },
                    { optionId: "2D", optionText: "Rarely", score: 4 },
                    { optionId: "2E", optionText: "Never", score: 5 }
                ]
            },
            {
                _id: "3",
                questionText: "How often do you smoke or use tobacco products?",
                options: [
                    { optionId: "3A", optionText: "Every day", score: 1 },
                    { optionId: "3B", optionText: "Several times a week", score: 2 },
                    { optionId: "3C", optionText: "Occasionally", score: 3 },
                    { optionId: "3D", optionText: "Rarely", score: 4 },
                    { optionId: "3E", optionText: "Never", score: 5 }
                ]
            },
            {
                _id: "4",
                questionText: "How would you describe your work-life balance?",
                options: [
                    { optionId: "4A", optionText: "Very unbalanced", score: 1 },
                    { optionId: "4B", optionText: "Mostly unbalanced", score: 2 },
                    { optionId: "4C", optionText: "Somewhat balanced", score: 3 },
                    { optionId: "4D", optionText: "Mostly balanced", score: 4 },
                    { optionId: "4E", optionText: "Very balanced", score: 5 }
                ]
            },
            {
                _id: "5",
                questionText: "How often do you engage in screen-free leisure activities (e.g., reading, exercise)?",
                options: [
                    { optionId: "5A", optionText: "Never", score: 1 },
                    { optionId: "5B", optionText: "Rarely", score: 2 },
                    { optionId: "5C", optionText: "Occasionally", score: 3 },
                    { optionId: "5D", optionText: "Often", score: 4 },
                    { optionId: "5E", optionText: "Every day", score: 5 }
                ]
            }
        ]
    },
    {
        categoryName: "Physical Health",
        description: "Questions related to physical health and fitness",
        totalScore: 25,
        questions: [
            {
                _id: "1",
                questionText: "How often do you engage in physical exercise (at least 30 minutes)?",
                options: [
                    { optionId: "1A", optionText: "Never", score: 1 },
                    { optionId: "1B", optionText: "Once a week", score: 2 },
                    { optionId: "1C", optionText: "A few times a week", score: 3 },
                    { optionId: "1D", optionText: "Most days", score: 4 },
                    { optionId: "1E", optionText: "Every day", score: 5 }
                ]
            },
            {
                _id: "2",
                questionText: "How would you rate your overall physical fitness?",
                options: [
                    { optionId: "2A", optionText: "Very poor", score: 1 },
                    { optionId: "2B", optionText: "Poor", score: 2 },
                    { optionId: "2C", optionText: "Fair", score: 3 },
                    { optionId: "2D", optionText: "Good", score: 4 },
                    { optionId: "2E", optionText: "Excellent", score: 5 }
                ]
            },
            {
                _id: "3",
                questionText: "How often do you experience physical pain or discomfort?",
                options: [
                    { optionId: "3A", optionText: "Every day", score: 1 },
                    { optionId: "3B", optionText: "A few times a week", score: 2 },
                    { optionId: "3C", optionText: "Occasionally", score: 3 },
                    { optionId: "3D", optionText: "Rarely", score: 4 },
                    { optionId: "3E", optionText: "Never", score: 5 }
                ]
            },
            {
                _id: "4",
                questionText: "How much time do you spend sitting each day (e.g., at work or during leisure)?",
                options: [
                    { optionId: "4A", optionText: "More than 10 hours", score: 1 },
                    { optionId: "4B", optionText: "8-10 hours", score: 2 },
                    { optionId: "4C", optionText: "6-8 hours", score: 3 },
                    { optionId: "4D", optionText: "4-6 hours", score: 4 },
                    { optionId: "4E", optionText: "Less than 4 hours", score: 5 }
                ]
            },
            {
                _id: "5",
                questionText: "How often do you check in with a healthcare provider (doctor, nurse, etc.) for checkups?",
                options: [
                    { optionId: "5A", optionText: "Never", score: 1 },
                    { optionId: "5B", optionText: "Only when sick", score: 2 },
                    { optionId: "5C", optionText: "Once every few years", score: 3 },
                    { optionId: "5D", optionText: "Once a year", score: 4 },
                    { optionId: "5E", optionText: "More than once a year", score: 5 }
                ]
            }
        ]
    }
];

export default data;