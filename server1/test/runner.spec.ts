/**
 * This file regroup all the cases that will be tested.
 * The cases will be tested in the order defined in this file
 * */
import loadCases from '@test/cases/load.case';
import loginCases from '@test/cases/login.case';
import signingCases from '@test/cases/signing.case';

// If we are load testing, we avoid the cases test
if (process.env.LOAD_TESTING) {
  loadCases();
} else {
  loginCases();
  signingCases();
}
