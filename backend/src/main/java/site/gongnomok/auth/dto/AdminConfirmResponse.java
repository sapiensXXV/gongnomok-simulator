package site.gongnomok.auth.dto;

public final class AdminConfirmResponse {

    private final String message;

    private AdminConfirmResponse (String message) {
        this.message = message;
    }

    public static AdminConfirmResponse of(String message) {
        return new AdminConfirmResponse(message);
    }
}
