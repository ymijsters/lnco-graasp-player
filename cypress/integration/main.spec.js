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
import { FOLDER_WITH_SUBFOLDER_ITEM } from '../fixtures/items';
import { FOLDER_NAME_TITLE_CLASS } from '../../src/config/selectors';
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
  });

  describe('Use cases', () => {
    beforeEach(() => {
      cy.setUpApi({ items: [...STATIC_ELECTRICITY.items] });
    });

    it(`Display ${STATIC_ELECTRICITY.items[0].name}`, () => {
      const parentFolder = STATIC_ELECTRICITY.items[0];
      const rootId = parentFolder.id;
      cy.visit(buildMainPath({ rootId, id: null }));

      expectFolderLayout({ rootId, items: STATIC_ELECTRICITY.items });
    });
  });
});
