package site.gongnomok.comment.dto.error;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentError {

    private int code;
    private String message;

}
