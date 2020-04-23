import { element, by, ElementFinder } from 'protractor';

export class CompteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-compte div table .btn-danger'));
  title = element.all(by.css('jhi-compte div h2#page-heading span')).first();
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

export class CompteUpdatePage {
  pageTitle = element(by.id('jhi-compte-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  pseudoInput = element(by.id('field_pseudo'));
  emailInput = element(by.id('field_email'));
  motDePasseInput = element(by.id('field_motDePasse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPseudoInput(pseudo: string): Promise<void> {
    await this.pseudoInput.sendKeys(pseudo);
  }

  async getPseudoInput(): Promise<string> {
    return await this.pseudoInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setMotDePasseInput(motDePasse: string): Promise<void> {
    await this.motDePasseInput.sendKeys(motDePasse);
  }

  async getMotDePasseInput(): Promise<string> {
    return await this.motDePasseInput.getAttribute('value');
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

export class CompteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-compte-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-compte'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
