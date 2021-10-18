import { buildMainPath } from '../../src/config/paths';
import { GRAASP_LINK_ITEM, YOUTUBE_LINK_ITEM } from '../fixtures/links';
import {
  expectDocumentViewScreenLayout,
  expectFileViewScreenLayout,
  expectLinkViewScreenLayout,
  expectAppViewScreenLayout,
  expectFolderButtonLayout,
  expectFolderLayout,
} from '../support/integrationUtils';
import {
  IMAGE_ITEM_DEFAULT,
  PDF_ITEM_DEFAULT,
  VIDEO_ITEM_DEFAULT,
} from '../fixtures/files';
import { GRAASP_DOCUMENT_ITEM } from '../fixtures/documents';
import { GRAASP_APP_ITEM } from '../fixtures/apps';
import {
  FOLDER_WITH_SUBFOLDER_ITEM,
  FOLDER_WITH_PINNED_ITEMS,
  ITEM_WITHOUT_CHAT_BOX,
  ITEM_WITH_CHAT_BOX,
} from '../fixtures/items';
import {
  FOLDER_NAME_TITLE_CLASS,
  ITEM_CHATBOX_ID,
  ITEM_CHATBOX_BUTTON_ID,
  PANNEL_CLOSE_BUTTON_ID,
  ITEM_PINNED_BUTTON_ID,
  ITEM_PINNED_ID,
  buildFolderButtonId,
} from '../../src/config/selectors';
import { STATIC_ELECTRICITY } from '../fixtures/useCases/staticElectricity';

describe('Main Screen', () => {
  describe('Individual Items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [
          GRAASP_LINK_ITEM,
          YOUTUBE_LINK_ITEM,
          IMAGE_ITEM_DEFAULT,
          VIDEO_ITEM_DEFAULT,
          PDF_ITEM_DEFAULT,
          GRAASP_DOCUMENT_ITEM,
          GRAASP_APP_ITEM,
          ...FOLDER_WITH_SUBFOLDER_ITEM.items,
          ...FOLDER_WITH_PINNED_ITEMS.items,
        ],
      });
    });

    describe('Links', () => {
      it('Website link', () => {
        const { id } = GRAASP_LINK_ITEM;
        cy.visit(buildMainPath({ rootId: id, id: null }));

        expectLinkViewScreenLayout(GRAASP_LINK_ITEM);
      });
      it('Youtube link', () => {
        const { id } = YOUTUBE_LINK_ITEM;
        cy.visit(buildMainPath({ rootId: id, id: null }));

        expectLinkViewScreenLayout(YOUTUBE_LINK_ITEM);
      });
    });

    describe('Files', () => {
      it('Image', () => {
        const { id } = IMAGE_ITEM_DEFAULT;
        cy.visit(buildMainPath({ rootId: id, id: null }));

        expectFileViewScreenLayout(IMAGE_ITEM_DEFAULT);
      });
      it('Video', () => {
        const { id } = VIDEO_ITEM_DEFAULT;
        cy.visit(buildMainPath({ rootId: id, id: null }));

        expectFileViewScreenLayout(VIDEO_ITEM_DEFAULT);
      });
      it('Pdf', () => {
        const { id } = PDF_ITEM_DEFAULT;
        cy.visit(buildMainPath({ rootId: id, id: null }));

        expectFileViewScreenLayout(PDF_ITEM_DEFAULT);
      });
    });

    describe('Documents', () => {
      it('Graasp Document', () => {
        cy.visit(buildMainPath({ rootId: GRAASP_DOCUMENT_ITEM.id, id: null }));

        expectDocumentViewScreenLayout(GRAASP_DOCUMENT_ITEM);
      });
    });

    describe('Apps', () => {
      it('App', () => {
        cy.visit(buildMainPath({ rootId: GRAASP_APP_ITEM.id, id: null }));

        expectAppViewScreenLayout(GRAASP_APP_ITEM);
      });
    });

    describe('Folders', () => {
      it('Display sub Folder', () => {
        const parent = FOLDER_WITH_SUBFOLDER_ITEM.items[0];
        cy.visit(buildMainPath({ rootId: parent.id, id: null }));

        cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', parent.name);

        expectFolderButtonLayout(FOLDER_WITH_SUBFOLDER_ITEM.items[1]);
      });
    });

    describe('Pinned Items', () => {
      it('Pinned button should toggle sidebar visiblity', () => {
        const parent = FOLDER_WITH_SUBFOLDER_ITEM.items[0];
        const item = FOLDER_WITH_SUBFOLDER_ITEM.items[2];

        cy.visit(buildMainPath({ rootId: parent.id, id: item.id }));

        cy.get(`#${ITEM_PINNED_BUTTON_ID}`).should('exist');
        cy.get(`#${ITEM_PINNED_ID}`).should('be.visible');

        cy.get(`#${ITEM_PINNED_BUTTON_ID}`).click();
        cy.get(`#${parent.id}`).should('not.exist');
      });

      it('Parent folder should display pinned children', () => {
        const parent = FOLDER_WITH_PINNED_ITEMS.items[0];
        const pinned = FOLDER_WITH_PINNED_ITEMS.items[2];
        cy.visit(buildMainPath({ rootId: parent.id, id: null }));

        cy.get(`#${ITEM_PINNED_ID} #${buildFolderButtonId(pinned.id)}`).should('contain', pinned.name);
      });

      it('Children should display pinned siblings', () => {
        const parent = FOLDER_WITH_PINNED_ITEMS.items[0];
        const item = FOLDER_WITH_PINNED_ITEMS.items[1];
        const pinned = FOLDER_WITH_PINNED_ITEMS.items[2];
        cy.visit(buildMainPath({ rootId: parent.id, id: item.id }));

        cy.get(`#${ITEM_PINNED_ID} #${buildFolderButtonId(pinned.id)}`).should('contain', pinned.name);
      });
    });

    describe('Chatbox', () => {
      beforeEach(() => {
        cy.setUpApi({ items: [ITEM_WITH_CHAT_BOX, ITEM_WITHOUT_CHAT_BOX] });
      });

      it('Chatbox button should toggle chatbox visiblity', () => {
        cy.visit(buildMainPath({ rootId: ITEM_WITH_CHAT_BOX.id, id: null }));

        cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('exist');
        cy.get(`#${ITEM_CHATBOX_ID}`).should('not.exist');

        cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).click();
        cy.get(`#${ITEM_CHATBOX_ID}`).should('be.visible');
      });

      it('Side pannel button sould hide chatbox', () => {
        cy.visit(buildMainPath({ rootId: ITEM_WITH_CHAT_BOX.id, id: null }));

        cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('exist');
        cy.get(`#${ITEM_CHATBOX_ID}`).should('not.be.exist');

        cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).click();
        cy.get(`#${ITEM_CHATBOX_ID}`).should('be.visible');

        cy.get(`#${PANNEL_CLOSE_BUTTON_ID}`).click();
        cy.get(`#${ITEM_CHATBOX_ID}`).should('not.exist');
      });

      it('Disabled chatbox should not have button', () => {
        cy.visit(buildMainPath({ rootId: ITEM_WITHOUT_CHAT_BOX.id, id: null }));

        cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('not.exist');
        cy.get(`#${ITEM_CHATBOX_ID}`).should('not.exist');
      });
    });
  });

  describe('Use cases', () => {
    beforeEach(() => {
      cy.setUpApi({ items: [...STATIC_ELECTRICITY.items] });
    });

    it(`Display ${STATIC_ELECTRICITY.items[0].name}`, () => {
      const parentFolder = STATIC_ELECTRICITY.items[0];
      const rootId = parentFolder.id;
      cy.visit(buildMainPath({ rootId }));

      expectFolderLayout({ rootId, items: STATIC_ELECTRICITY.items });
    });
  });
});
