package site.gongnomok.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.exhandler.dto.ErrorResponse;
import site.gongnomok.global.exception.AdminException;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.dto.response.ItemExceptionResponse;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(ItemException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ItemExceptionResponse itemException(ItemException ex) {
        return new ItemExceptionResponse(ex.getCode(), ex.getMessage());
    }

    @ExceptionHandler(AdminException.class)
    protected ResponseEntity<ErrorResponse> handleAdminException(AdminException ex) {
        return ResponseEntity
            .status(403)
            .body(new ErrorResponse(ex.getCode(), ex.getMessage()));
    }
}
