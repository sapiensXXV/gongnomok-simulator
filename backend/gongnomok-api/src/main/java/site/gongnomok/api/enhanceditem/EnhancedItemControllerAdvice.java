package site.gongnomok.api.enhanceditem;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.common.exception.EnhancedItemException;

@RestControllerAdvice
public class EnhancedItemControllerAdvice {

    @ExceptionHandler(EnhancedItemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void enhancedItemException() {

    }

}
