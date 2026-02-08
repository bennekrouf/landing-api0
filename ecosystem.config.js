module.exports = {
    apps: [{
        name: "api0-landing",
        script: "npm",
        args: "start",
        instances: 1,
        exec_mode: "fork",
        env: {
            NODE_ENV: "production",
            PORT: 3005,
            CONFIG_PATH: "./config.yaml"
        },
        error_file: "./logs/api0-landing-error.log",
        out_file: "./logs/api0-landing-out.log",
        log_file: "./logs/api0-landing-combined.log",
        time: true,
        max_memory_restart: "500M"
    }]
};
