package site.gongnomok.domain.comment.dto.error;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentError {

    private String code;
    private String message;

}
