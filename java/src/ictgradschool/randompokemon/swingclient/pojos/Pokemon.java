package ictgradschool.randompokemon.swingclient.pojos;

public class Pokemon {

    private int id;
    private String name;
    private String types;
    private String dexEntry;
    private String sprite;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTypes() {
        return types;
    }

    public void setTypes(String types) {
        this.types = types;
    }

    public String getDexEntry() {
        return dexEntry;
    }

    public void setDexEntry(String dexEntry) {
        this.dexEntry = dexEntry;
    }

    public String getSprite() {
        return sprite;
    }

    public void setSprite(String sprite) {
        this.sprite = sprite;
    }
}
