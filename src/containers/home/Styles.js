export const columns = [
  { title: 'Client', name: 'clients' },
  { title: 'Pasta', name: 'folder' },
  { title: 'Titulo', name: 'title' },
  { title: 'Data de criação', name: 'createdAt' },
  { title: 'Reponsavel', name: 'responsible' },
  { title: 'Acesso', name: 'access' },
  { title: 'Etiqueta', name: 'tag' },
  { title: 'Descrição', name: 'description' },
  { title: 'id', name: 'id' },
];

export const dateFormatter = ({ value }) => {
  if (value) {
    const d = new Date(value * 1000);
    const ye = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
  }
  return '';
}

export const accessFormatter = ({ value }) => {
  if (value) {
    if (value === 'PUBLIC') {
      return 'Publico'
    }
    return 'Privado'
  }
  return '';
}

export const tagFormatter = ({ value }) => {
  if (value) {
    return `#${value.join(' #')}`
  }
  return '';
}

export const tagFormatterForm = (value) => {
  if (value && Array.isArray(value)) {
    return `#${value.join(' #')}`
  }
  return value;
}

export const columnExtensions = [{ columnName: 'title', filteringEnabled: false }, { columnName: 'folder', filteringEnabled: false }, { columnName: 'description', filteringEnabled: false }];

export const pageSizes = [5, 10, 20, 50, 100];
