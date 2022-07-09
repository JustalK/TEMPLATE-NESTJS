// @ts-nocheck
const dotenv = require('dotenv');
dotenv.config({ path: __dirname+'/../env/dev.env' });
const sonarqubeScanner =  require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl:  `http://${process.env.VIRTUAL_HOST_SONARQUBE}`,
        options : {
            'sonar.login': process.env.SONAR_LOGIN || 'admin',
            'sonar.password': process.env.SONAR_PASSWORD || 'test',
            'sonar.sources':  'src',
            'sonar.tests':  'test',
            'sonar.inclusions'  :  '**',
            'sonar.test.inclusions':  'test/**/*.spec.js,test/**/*.spec.ts',
            'sonar.testExecutionReportPaths': 'test-report.xml',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info'
        }
    }, () => {});
