export interface CommentForm {
  name: string
  password: string
  content: string
}

export interface CommentDeleteForm {
  commentId: number | null
  password: string
}

export interface CommentReportForm {
  commentId: number | null
}

export const INIT_COMMENT_FORM: CommentForm = {
  name: '',
  password: '',
  content: '',
}

export const INIT_COMMENT_DELETE_FORM: CommentDeleteForm = {
  commentId: null,
  password: '',
}

export const INIT_COMMENT_REPORT_FORM: CommentReportForm = {
  commentId: null,
}

export const DEFAULT_COMMENT_FETCH_SIZE = 20
