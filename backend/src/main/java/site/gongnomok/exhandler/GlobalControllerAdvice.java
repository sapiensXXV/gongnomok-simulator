package site.gongnomok.exhandler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.exhandler.dto.ErrorResponse;
import site.gongnomok.global.exception.AdminException;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(AdminException.class)
    protected ResponseEntity<?> handleAdminException(AdminException ex) {
        return ResponseEntity.status(403).body(ErrorResponse.of(ex.getCode(), ex.getMessage()));
    }
}
