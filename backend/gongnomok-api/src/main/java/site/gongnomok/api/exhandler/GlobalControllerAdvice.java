package site.gongnomok.api.exhandler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.api.exhandler.dto.ErrorResponse;
import site.gongnomok.common.exception.AdminException;
import site.gongnomok.common.exception.IncludeBanWordException;
import site.gongnomok.common.exception.ItemException;
import site.gongnomok.common.item.dto.response.ItemExceptionResponse;

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

    @ExceptionHandler(IncludeBanWordException.class)
    public ResponseEntity<ErrorResponse> handleIncludeBanWordException(IncludeBanWordException ex) {
        return ResponseEntity
            .badRequest()
            .body(new ErrorResponse(ex.getCode(), ex.getMessage()));
    }
}
