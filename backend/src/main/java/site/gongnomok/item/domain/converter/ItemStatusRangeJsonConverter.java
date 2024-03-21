package site.gongnomok.item.domain.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import site.gongnomok.item.domain.ItemStatusRange;

@Converter(autoApply = true)
public class ItemStatusRangeJsonConverter implements AttributeConverter<ItemStatusRange, String> {

    private final static ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ItemStatusRange attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ItemStatusRange convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, ItemStatusRange.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
