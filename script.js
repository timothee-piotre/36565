// scripts/setup.js

const { exec } = require('child_process');
const path = require('path');

// Chemins des fichiers à exécuter
const backendServerPath = path.join(__dirname, '..', 'social-network-backend', 'server.js');
const frontendServerPath = path.join(__dirname, '..', 'social-network-frontend', 'index.html'); // Ajustez selon la méthode de démarrage de votre frontend

// Fonction pour exécuter une commande
function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}

// Démarrer le serveur backend
async function startBackend() {
    console.log('Starting backend server...');
    try {
        await runCommand('node server.js', path.join(__dirname, '..', 'social-network-backend'));
        console.log('Backend server started successfully.');
    } catch (error) {
        console.error('Failed to start backend server.');
    }
}

// Démarrer le frontend (si nécessaire)
async function startFrontend() {
    // Remplacez cette partie par la commande spécifique à votre frontend
    console.log('Starting frontend server...');
    // Par exemple, si vous utilisez Live Server, vous pouvez le démarrer ici
    // await runCommand('npx live-server', path.join(__dirname, '..', 'frontend'));
    console.log('Frontend server started successfully.');
}

// Fonction principale
async function startServers() {
    await startBackend();
    await startFrontend();
}

// Exécuter les serveurs
startServers();
