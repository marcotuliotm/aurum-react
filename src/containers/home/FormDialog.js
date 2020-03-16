import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { tagFormatterForm } from './Styles';

export default function FormDialog({ togle = false, setTogle, aCase, handleFormChange, handleSubmit }) {
    const { folder, clients, title, responsible, description, access, tag } = aCase;

    return (
        <div>
            <Dialog open={togle} onClose={setTogle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cases</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Select fullWidth value={access} name="access" onChange={handleFormChange} label="Tipo de acesso">
                                <MenuItem value="PUBLIC">Acesso Público</MenuItem>
                                <MenuItem value="PRIVATE">Acesso Privado</MenuItem>
                            </Select>
                            <TextValidator
                                label="Pasta"
                                onChange={handleFormChange}
                                name="folder"
                                value={folder}
                                validators={['required', 'maxStringLength:40']}
                                errorMessages={['campo requerido', 'Pasta pode ter no máximo 40']}
                                fullWidth
                            />
                            <TextValidator
                                label="Cliente"
                                onChange={handleFormChange}
                                name="clients"
                                value={clients}
                                validators={['required']}
                                errorMessages={['campo requerido']}
                                fullWidth
                            />
                            <TextValidator
                                label="Título"
                                onChange={handleFormChange}
                                name="title"
                                value={title}
                                validators={['required']}
                                errorMessages={['campo requerido']}
                                fullWidth
                            />
                            <TextValidator
                                label="Responsavel"
                                onChange={handleFormChange}
                                name="responsible"
                                value={responsible}
                                validators={['required']}
                                errorMessages={['campo requerido']}
                                fullWidth
                            />
                            <TextValidator
                                label="Descrição"
                                onChange={handleFormChange}
                                name="description"
                                value={description}
                                fullWidth
                            />
                            <TextValidator
                                label="Separar as Etiquetas com #"
                                onChange={handleFormChange}
                                name="tag"
                                value={tagFormatterForm(tag)}
                                fullWidth
                            />
                            <DialogActions>
                                <Button onClick={setTogle} color="primary">
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary">
                                    Salvar
                                </Button>
                            </DialogActions>
                        </ValidatorForm>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </div>
    );
}