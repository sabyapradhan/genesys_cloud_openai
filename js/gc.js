
function initializeGenesysCloud() {
    const clientId = "CLIENTID";
    const redirectUri = 'WEBAPP URL';
    // Set purecloud objects
    const platformClient = require('platformClient');
    const client = platformClient.ApiClient.instance;
    const conversationsApi = new platformClient.ConversationsApi();
    // Local vars
    const urlParams = new URLSearchParams(window.location.search);
    const env = urlParams.get('environment');
    let conversationId = urlParams.get('conversationId');
    // Set PureCloud settings
    client.setEnvironment(env);
    client.setPersistSettings(false, 'Ask OpenAI');

    $(document).ready(() => {
        // Authenticate with PureCloud
        client.loginImplicitGrant(clientId, redirectUri, {
            'state': conversationId
        }).then((data) => {
            console.log('Logged in with state: ' + JSON.stringify(data));
            conversationId = data.state;
        }).catch((err) => {
            console.error(err);
            document.getElementById('number').value = 'cannot log in';
        })
    });
}
