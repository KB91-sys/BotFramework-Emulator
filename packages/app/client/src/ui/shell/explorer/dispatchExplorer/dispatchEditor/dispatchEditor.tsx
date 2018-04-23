import { IDispatchService } from '@bfemulator/sdk-shared';
import { Modal, ModalActions, ModalContent, PrimaryButton, TextInputField } from '@bfemulator/ui-react';
import * as React from 'react';
import { Component, SyntheticEvent } from 'react';

interface DispatchEditorProps {
  dispatchService: IDispatchService,
  cancel: () => void,
  updateDispatchService: (updatedDispatchService: IDispatchService) => void;
}

const title = 'Connect to a Dispatch Application';
const detailedDescription = 'You can connect your bot to a Dispatch.ai application';
const modalCssOverrides = {
  width: '400px',
  height: '500px'
};

export class DispatchEditor extends Component<DispatchEditorProps, IDispatchService> {

  public state: IDispatchService = {} as IDispatchService;

  constructor(props, state) {
    super(props, state);
    this.state = props.dispatchService;
  }

  public componentWillReceiveProps(nextProps: Readonly<DispatchEditorProps>): void {
    this.setState({ ...nextProps.dispatchService });
  }

  public render(): JSX.Element {
    const { name, appId, authoringKey, subscriptionKey, version } = this.state;
    return (
      <Modal cssOverrides={modalCssOverrides} title={title} detailedDescription={detailedDescription} cancel={this.onCancelClick}>
        <ModalContent>
          <TextInputField value={name} onChange={this.onInputChange} label="Name" required={true} inputAttributes={{ 'data-propName': 'name' }} />
          <TextInputField value={appId} onChange={this.onInputChange} label="Application Id" required={true} inputAttributes={{ 'data-propName': 'appId' }} />
          <TextInputField value={authoringKey} onChange={this.onInputChange} label="Authoring key" required={true} inputAttributes={{ 'data-propName': 'authoringKey' }} />
          <TextInputField value={version} onChange={this.onInputChange} label="Version" required={true} inputAttributes={{ 'data-propName': 'version' }} />
          <TextInputField value={subscriptionKey} onChange={this.onInputChange} label="Subscription key" required={false} inputAttributes={{ 'data-propName': 'subscriptionKey' }} />
        </ModalContent>
        <ModalActions>
          <PrimaryButton text="Cancel" secondary={true} onClick={this.onCancelClick} />
          <PrimaryButton text="Submit" onClick={this.onSubmitClick} />
        </ModalActions>
      </Modal>
    );
  }

  private onCancelClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    this.props.cancel();
  };

  private onSubmitClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    // appId value should be used as id
    const state = { ...this.state, id: this.state.appId };
    this.props.updateDispatchService(state);
  };

  private onInputChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { currentTarget: input } = event;
    const propName = input.getAttribute('data-propName');
    this.setState({ [propName as any]: input.value });
  };
}
