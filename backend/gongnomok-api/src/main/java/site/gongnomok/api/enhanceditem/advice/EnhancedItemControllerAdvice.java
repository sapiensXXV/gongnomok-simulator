package site.gongnomok.api.enhanceditem.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.api.enhanceditem.EnhancedItemController;
import site.gongnomok.common.exception.EnhancedItemException;
import site.gongnomok.common.global.exception.ExceptionResponse;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Slf4j
@RestControllerAdvice(assignableTypes = { EnhancedItemController.class })
public class EnhancedItemControllerAdvice {
    
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ExceptionResponse handleIllegalArgumentException(IllegalArgumentException ex) {
        return ExceptionResponse.message(ex.getMessage());
    }
    
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(EnhancedItemException.class)
    public ExceptionResponse handleEnhancedItemException(EnhancedItemException ex) {
        return ExceptionResponse.message("ERROR CODE" + ex.getCode());
    }
}
