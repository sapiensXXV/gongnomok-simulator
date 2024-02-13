package site.gongnomok.global.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QItem is a Querydsl query type for Item
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItem extends EntityPathBase<Item> {

    private static final long serialVersionUID = 1876990337L;

    public static final QItem item = new QItem("item");

    public final EnumPath<site.gongnomok.global.entity.enumerate.Category> category = createEnum("category", site.gongnomok.global.entity.enumerate.Category.class);

    public final NumberPath<Integer> dex = createNumber("dex", Integer.class);

    public final NumberPath<Integer> hp = createNumber("hp", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> intel = createNumber("intel", Integer.class);

    public final NumberPath<Integer> luk = createNumber("luk", Integer.class);

    public final NumberPath<Integer> mgAtk = createNumber("mgAtk", Integer.class);

    public final NumberPath<Integer> mgDef = createNumber("mgDef", Integer.class);

    public final NumberPath<Integer> mp = createNumber("mp", Integer.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> phyAtk = createNumber("phyAtk", Integer.class);

    public final NumberPath<Integer> phyDef = createNumber("phyDef", Integer.class);

    public final NumberPath<Integer> requiredDex = createNumber("requiredDex", Integer.class);

    public final NumberPath<Integer> requiredInt = createNumber("requiredInt", Integer.class);

    public final EnumPath<site.gongnomok.global.entity.enumerate.Job> requiredJob = createEnum("requiredJob", site.gongnomok.global.entity.enumerate.Job.class);

    public final NumberPath<Integer> requiredLevel = createNumber("requiredLevel", Integer.class);

    public final NumberPath<Integer> requiredLuk = createNumber("requiredLuk", Integer.class);

    public final NumberPath<Integer> requiredPop = createNumber("requiredPop", Integer.class);

    public final NumberPath<Integer> requiredStr = createNumber("requiredStr", Integer.class);

    public final NumberPath<Integer> str = createNumber("str", Integer.class);

    public final NumberPath<Integer> upgradable = createNumber("upgradable", Integer.class);

    public QItem(String variable) {
        super(Item.class, forVariable(variable));
    }

    public QItem(Path<? extends Item> path) {
        super(path.getType(), path.getMetadata());
    }

    public QItem(PathMetadata metadata) {
        super(Item.class, metadata);
    }

}

