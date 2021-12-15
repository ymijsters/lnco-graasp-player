// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { CURRENT_USER } from '../fixtures/members';
import {
  mockDefaultDownloadFile,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetItem,
  mockGetMemberBy,
} from './server';

Cypress.Commands.add(
  'setUpApi',
  ({
    items = [],
    members = [],
    currentMember = CURRENT_USER,
    getItemError = false,
    getMemberError = false,
    getCurrentMemberError = false,
  } = {}) => {
    const cachedItems = JSON.parse(JSON.stringify(items));
    const cachedMembers = JSON.parse(JSON.stringify(members));

    cy.setCookie('session', currentMember ? 'somecookie' : null);

    mockGetItem(
      { items: cachedItems, currentMember },
      getItemError || getCurrentMemberError,
    );

    mockGetChildren(cachedItems);

    mockGetMemberBy(cachedMembers, getMemberError);

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockDefaultDownloadFile(cachedItems);
  },
);
