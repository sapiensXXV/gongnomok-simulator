package site.gongnomok.item.presentation;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.dto.response.ItemExceptionResponse;


@Slf4j
@RestControllerAdvice(assignableTypes = ItemController.class)
public class ItemControllerAdvice {

    @ExceptionHandler(ItemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ItemExceptionResponse itemException(ItemException ex) {
        return new ItemExceptionResponse(ex.getCode(), ex.getMessage());
    }

}
