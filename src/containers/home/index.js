import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  SortingState,
  CustomPaging,
  DataTypeProvider,
  EditingState,
  SelectionState,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableColumnVisibility,
  TableEditColumn,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  find,
  loadAll,
  create,
  remove,
  edit,
  cancel,
} from '../../modules/cases'
import ScrollDialog from './ScrollDialogErros';
import Search from './Search';
import { columns, dateFormatter, accessFormatter, tagFormatter, pageSizes, columnExtensions } from './Styles';
import FormDialog from "./FormDialog"
import EditPopupPlugin from "./EditPopupPlugin"



const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const EditButton = ({ onExecute }) => {
  return (
    <IconButton onClick={(onExecute)} title="Editar Caso">
      <EditIcon />
    </IconButton>
  );
}

class Home extends React.Component {
  state = {
    togle: false,
    aCase: { access: 'PUBLIC' },
    selection: [],
  }

  componentDidMount() {
    this.props.loadAll();
  };

  onCurrentPageChange = (page) => {
    const { filter } = this.props;
    const { limit } = this.props.cases;
    this.props.find(filter, page, limit);
  }

  onPageSizeChange = (pageSize) => {
    const { filter } = this.props;
    const { offset } = this.props.cases;
    this.props.find(filter, offset, pageSize);
  }

  getRowId = row => row.id;

  commitChanges = ({ added, changed, deleted }) => {
    if (deleted) {
      deleted.map(id => this.props.remove(id));
    } else if (added) {
      this.setTogle();
    }
  };

  setTogle = () => {
    this.setState({ togle: !this.state.togle });
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      aCase: {
        ...this.state.aCase,
        [name]: value,
      }
    })
  }
  setCase = (aCase) => this.setState({
    ...this.state,
    aCase,
    togle: true,
  })

  handleSubmit = () => {
    let { aCase } = this.state;
    let { tag } = aCase;

    if (tag  && !Array.isArray(tag)) {
      tag = tag.trim().substring(1).split('#');
      aCase = {
        ...aCase,
        tag,
      }
    }
    this.save(aCase);
  }

  save = (aCase) => {
    if (aCase.id) {
      this.props.edit(aCase);
    } else {
      this.props.create(aCase);
    }
    this.setState({ aCase: { access: 'PUBLIC' }, togle: false, });
  }

  AddButton = ({ onExecute }) => (
    <div style={{ textAlign: "center" }}>
      <Button color="primary" onClick={this.setTogle} title="Novo Caso">
        Novo Caso
      </Button>
    </div>
  );

  render() {
    const { togle, aCase, selection } = this.state;
    const { cases, loading, errors, cancel, find, filter } = this.props;
    const { elements, totalElements, offset, limit } = cases;

    const commandComponents = {
      add: this.AddButton,
      edit: EditButton,
      delete: DeleteButton,
      commit: CommitButton,
      cancel: CancelButton
    };

    const Command = ({ id, onExecute }) => {
      const CommandButton = commandComponents[id];
      return <CommandButton onExecute={onExecute} />;
    };


    return (
      <Container display='flex' component="main" maxWidth="lg">
        <CssBaseline />
        <ScrollDialog errors={errors} cancel={cancel} />
        <Search find={find} filter={filter} pageSize={limit} />
        <FormDialog togle={togle} setTogle={this.setTogle} aCase={aCase} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit} />
        {loading ? <CircularProgress style={{ position: 'relative', margin: '15em', marginLeft: '40em' }} /> :
          <Paper style={{ position: 'relative', margin: '5em' }}>
            <Grid
              rows={elements}
              columns={columns}
              getRowId={this.getRowId}>
              <PagingState
                currentPage={offset}
                onCurrentPageChange={this.onCurrentPageChange}
                pageSize={limit}
                onPageSizeChange={this.onPageSizeChange}
              />
              <DataTypeProvider formatterComponent={dateFormatter} for={['createdAt']} />
              <DataTypeProvider formatterComponent={accessFormatter} for={['access']} />
              <DataTypeProvider formatterComponent={tagFormatter} for={['tag']} />
              <CustomPaging totalCount={totalElements} />
              <SelectionState
                selection={selection}
                onSelectionChange={this.changeSelection}
              />
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <SortingState />
              <FilteringState
                  columnExtensions={columnExtensions}
              />
              <IntegratedFiltering />
              <Table />
              <TableFilterRow />
              <TableHeaderRow showSortingControls />
              <TableColumnVisibility
                defaultHiddenColumnNames={['id']}
              />
              <PagingPanel
                pageSizes={pageSizes}
              />
              <TableEditColumn
                showEditCommand
                showAddCommand
                showDeleteCommand
                commandComponent={Command} />
              <EditPopupPlugin setCase={this.setCase} />
            </Grid>
          </Paper>
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ cases }) => ({
  cases: cases.data,
  loading: cases.loading,
  errors: cases.error,
  filter: cases.filter,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      find,
      loadAll,
      create,
      remove,
      edit,
      cancel,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
