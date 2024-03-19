package site.gongnomok.comment.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.comment.dto.error.CommentError;
import site.gongnomok.global.exception.CommentException;


@RestControllerAdvice(basePackages = {"site.gongnomok.domain.comment"})
public class CommentExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommentError handleCommentException(final CommentException e) {
        return new CommentError(e.getCode(), e.getMessage());
    }

}
