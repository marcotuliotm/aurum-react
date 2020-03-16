import * as React from "react";
import {
    Plugin,
    Template,
    TemplateConnector,
    TemplatePlaceholder
} from "@devexpress/dx-react-core";


class EditPopupPlugin extends React.PureComponent {
    render() {
        const { setCase } = this.props;
        return (
            <Plugin>
                <Template name="editPopup">
                    <TemplateConnector>
                        {(
                            {
                                rows,
                                getRowId,
                                editingRowIds,
                                createRowChange,
                                rowChanges,
                                isColumnEditingEnabled
                            },
                            { changeRow, commitChangedRows, stopEditRows }
                        ) => {
                            const rowId = editingRowIds[editingRowIds.length - 1];
                            const open = editingRowIds.length > 0;
                            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
                            if (open) {
                                const changedRow = { ...targetRow, ...rowChanges[rowId] };
                                setCase(changedRow);
                                stopEditRows({ rowIds: editingRowIds });
                            }

                            return (
                                null
                            );
                        }}
                    </TemplateConnector>
                </Template>
                <Template name="root">
                    <TemplatePlaceholder />
                    <TemplatePlaceholder name="editPopup" />
                </Template>
            </Plugin>
        );
    }
}

export default EditPopupPlugin;