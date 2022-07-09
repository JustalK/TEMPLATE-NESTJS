// @ts-nocheck
const sonarqubeScanner =  require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl:  'http://sonar.server1.net',
        options : {
            'sonar.login': 'admin',
            'sonar.password': 'test',
            'sonar.sources':  'src',
            'sonar.tests':  'test',
            'sonar.inclusions'  :  '**',
            'sonar.test.inclusions':  'test/**/*.spec.js,test/**/*.spec.ts',
            'sonar.testExecutionReportPaths': 'test-report.xml',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info'
        }
    }, () => {});
