

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });

export const sendEmail = async (email,otp) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <h1 style="color: #4CAF50;">Your OTP Code</h1>
            <p style="font-size: 18px;">Use the following OTP to complete your verification:</p>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">${otp}</div>
            <p style="font-size: 16px;">If you did not request this, please ignore this email.</p>
        </div>
    `;

    mg.messages.create('sandbox-123.mailgun.org', {
        from: "Excited User <mailgun@sandboxe64e72a39f3d43019b76c490f6a7e7b3.mailgun.org>",
        to: ["test@example.com"],
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. Use this to complete your verification.`,
        html: htmlContent
    })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error

}
