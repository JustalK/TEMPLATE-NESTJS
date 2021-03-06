/**
 * This file regroup all the cases that will be tested.
 * The cases will be tested in the order defined in this file
 * */
import appCases from '@test/cases/app.case';
import loginCases from '@test/cases/login.case';
import signingCases from '@test/cases/signing.case';

appCases();
loginCases();
signingCases();
