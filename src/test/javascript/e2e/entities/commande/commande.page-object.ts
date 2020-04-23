import { element, by, ElementFinder } from 'protractor';

export class CommandeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commande div table .btn-danger'));
  title = element.all(by.css('jhi-commande div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CommandeUpdatePage {
  pageTitle = element(by.id('jhi-commande-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  etatPrepSelect = element(by.id('field_etatPrep'));
  etatLivSelect = element(by.id('field_etatLiv'));
  paiementSelect = element(by.id('field_paiement'));

  restaurantSelect = element(by.id('field_restaurant'));
  livreurSelect = element(by.id('field_livreur'));
  clientSelect = element(by.id('field_client'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEtatPrepSelect(etatPrep: string): Promise<void> {
    await this.etatPrepSelect.sendKeys(etatPrep);
  }

  async getEtatPrepSelect(): Promise<string> {
    return await this.etatPrepSelect.element(by.css('option:checked')).getText();
  }

  async etatPrepSelectLastOption(): Promise<void> {
    await this.etatPrepSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setEtatLivSelect(etatLiv: string): Promise<void> {
    await this.etatLivSelect.sendKeys(etatLiv);
  }

  async getEtatLivSelect(): Promise<string> {
    return await this.etatLivSelect.element(by.css('option:checked')).getText();
  }

  async etatLivSelectLastOption(): Promise<void> {
    await this.etatLivSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPaiementSelect(paiement: string): Promise<void> {
    await this.paiementSelect.sendKeys(paiement);
  }

  async getPaiementSelect(): Promise<string> {
    return await this.paiementSelect.element(by.css('option:checked')).getText();
  }

  async paiementSelectLastOption(): Promise<void> {
    await this.paiementSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async livreurSelectLastOption(): Promise<void> {
    await this.livreurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async livreurSelectOption(option: string): Promise<void> {
    await this.livreurSelect.sendKeys(option);
  }

  getLivreurSelect(): ElementFinder {
    return this.livreurSelect;
  }

  async getLivreurSelectedOption(): Promise<string> {
    return await this.livreurSelect.element(by.css('option:checked')).getText();
  }

  async clientSelectLastOption(): Promise<void> {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option: string): Promise<void> {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption(): Promise<string> {
    return await this.clientSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CommandeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commande-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commande'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
