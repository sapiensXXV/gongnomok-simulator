package site.gongnomok.member.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.gongnomok.member.exception.CannotFindMemberException;
import site.gongnomok.member.exception.InvalidMemberFindResponse;
import site.gongnomok.member.presentation.MemberController;

@Slf4j
@RestControllerAdvice(assignableTypes = {MemberController.class})
public class MemberControllerAdvice {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(CannotFindMemberException.class)
    public InvalidMemberFindResponse memberMatchFail(CannotFindMemberException ex) {
        log.info("login fail");
        return new InvalidMemberFindResponse(ex.getMessage());
    }

}
