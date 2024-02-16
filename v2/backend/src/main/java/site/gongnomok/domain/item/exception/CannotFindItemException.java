package site.gongnomok.domain.item.exception;

public class CannotFindItemException extends RuntimeException {
    public CannotFindItemException() {
        super();
    }

    public CannotFindItemException(Long itemId) {
        this("cannot find item id=[" + itemId + "]");
    }

    public CannotFindItemException(String message) {
        super(message);
    }

    public CannotFindItemException(String message, Throwable cause) {
        super(message, cause);
    }

    public CannotFindItemException(Throwable cause) {
        super(cause);
    }

    protected CannotFindItemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
