export default function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    if (new Date(b[orderBy]) < new Date(a[orderBy])) {
      return -1
    }
    if (new Date(b[orderBy]) > new Date(a[orderBy])) {
      return 1
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
  }
  return 0
}
