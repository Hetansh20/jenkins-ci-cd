
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Deployment Dashboard</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #101827;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }

                .container {
                    background: #1e293b;
                    padding: 40px;
                    border-radius: 12px;
                    width: 450px;
                    text-align: center;
                }

                h1 {
                    color: #38bdf8;
                }

                .status {
                    color: #4ade80;
                    font-weight: bold;
                }

                .info {
                    background: #334155;
                    padding: 12px;
                    margin-top: 12px;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>DevOps Deployment Dashboard</h1>
                <p>Welcome to our automated deployment project.</p>

                <div class="info">
                    Application: Node.js + Express
                </div>

                <div class="info">
                    Deployment: <span class="status">Successful</span>
                </div>

                <div class="info">
                    Environment: ${process.env.NODE_ENV || "Development"}
                </div>

                <div class="info">
                    Server Time: ${new Date().toLocaleString()}
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        application: "devops-deployment-dashboard"
    });
});

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Application running on port ${PORT}`);
    });
}

module.exports = app;
