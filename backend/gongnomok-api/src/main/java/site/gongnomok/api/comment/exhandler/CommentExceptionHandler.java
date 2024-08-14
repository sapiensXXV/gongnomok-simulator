package site.gongnomok.api.comment.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.common.comment.dto.error.CommentError;
import site.gongnomok.common.exception.CommentException;


@RestControllerAdvice(basePackages = {"site.gongnomok.api"})
public class CommentExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommentError handleCommentException(final CommentException e) {
        return new CommentError(e.getCode(), e.getMessage());
    }

}
