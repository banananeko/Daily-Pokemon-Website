package ictgradschool.randompokemon.swingclient;

import ictgradschool.randompokemon.swingclient.ui.PokemonApp;

import javax.swing.*;

public class Main {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(PokemonApp::new);
    }
}
