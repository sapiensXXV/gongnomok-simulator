package site.gongnomok.comment.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.comment.dto.error.CommentError;
import site.gongnomok.comment.exception.CannotFindCommentByIdException;
import site.gongnomok.comment.exception.CommentPasswordNotMatchException;


@RestControllerAdvice(basePackages = {"site.gongnomok.domain.comment"})
public class CommentExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommentError handleCannotFindCommentByIdException(CannotFindCommentByIdException e) {
        return new CommentError("BAD_REQUEST COMMENT ID NOT EXIST", e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommentError handleCommentPasswordNotMatchException(CommentPasswordNotMatchException e) {
        return new CommentError("BAD_REQUEST PASSWORD NOT MATCH", e.getMessage());
    }

}
