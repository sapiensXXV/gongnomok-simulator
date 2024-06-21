package site.gongnomok.enhanceditem.presentation.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.global.exception.EnhancedItemException;

@RestControllerAdvice
public class EnhancedItemControllerAdvice {

    @ExceptionHandler(EnhancedItemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void enhancedItemException() {

    }

}
