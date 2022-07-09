const sonarqubeScanner =  require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl:  'http://sonar.server1.net',
        options : {
            'sonar.login': 'admin',
            'sonar.password': 'test',
            'sonar.sources':  'src',
            'sonar.tests':  'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info'
        }
    }, () => {});
