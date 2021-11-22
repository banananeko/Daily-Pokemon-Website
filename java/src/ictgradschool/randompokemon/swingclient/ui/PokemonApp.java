package ictgradschool.randompokemon.swingclient.ui;

import ictgradschool.randompokemon.swingclient.pojos.Pokemon;
import ictgradschool.randompokemon.swingclient.pojos.TypeQuery;
import ictgradschool.randompokemon.swingclient.web.API;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

/**
 * @author anhyd
 */
public class PokemonApp extends javax.swing.JFrame {

    private JButton btnChange;
    private JLabel imgSprite;
    private JLabel lblCookie;
    private JLabel lblName;
    private JLabel lblTypes;
    private JTextArea txtAbout;
    private JComboBox<String> cboType;

    private final ImageIcon defaultImage;

    /**
     * Creates new form PokemonApp
     */
    public PokemonApp() {

        this.defaultImage = new ImageIcon(
                getClass().getResource("/ictgradschool/randompokemon/swingclient/ui/placeholder.png"));

        initComponents();

        btnChange.addActionListener(this::handleBtnChangeClick);

        setLocationRelativeTo(null);
        setVisible(true);
    }

    @SuppressWarnings("unchecked")
    private void initComponents() {

        imgSprite = new javax.swing.JLabel();
        JLabel jLabel1 = new javax.swing.JLabel();
        JLabel jLabel2 = new javax.swing.JLabel();
        JLabel jLabel3 = new javax.swing.JLabel();
        lblName = new javax.swing.JLabel();
        lblTypes = new javax.swing.JLabel();
        JScrollPane jScrollPane1 = new javax.swing.JScrollPane();
        txtAbout = new javax.swing.JTextArea();
        btnChange = new javax.swing.JButton();
        lblCookie = new javax.swing.JLabel();
        cboType = new javax.swing.JComboBox<>();
        JLabel jLabel4 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        imgSprite.setIcon(this.defaultImage); // NOI18N
        imgSprite.setBorder(javax.swing.BorderFactory.createLineBorder(null, 1));

        jLabel1.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
        jLabel1.setText("Name:");

        jLabel2.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
        jLabel2.setText("Types:");

        jLabel3.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
        jLabel3.setText("About:");

        lblName.setText("Name goes here");

        lblTypes.setText("Types go here");

        txtAbout.setEditable(false);
        txtAbout.setColumns(20);
        txtAbout.setLineWrap(true);
        txtAbout.setRows(5);
        jScrollPane1.setViewportView(txtAbout);

        btnChange.setText("Change");

        lblCookie.setText("You've seen 0 Pokémon so far!");

        cboType.setModel(new javax.swing.DefaultComboBoxModel<>(new String[]{"Any", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"}));

        jLabel4.setText("Filter type:");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                                .addContainerGap()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(layout.createSequentialGroup()
                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                        .addComponent(imgSprite, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                        .addComponent(cboType, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                        .addComponent(jLabel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                        .addComponent(btnChange, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 98, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 309, Short.MAX_VALUE)
                                                        .addGroup(layout.createSequentialGroup()
                                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                        .addGroup(layout.createSequentialGroup()
                                                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                                        .addComponent(jLabel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                                        .addComponent(jLabel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                                        .addComponent(lblName)
                                                                                        .addComponent(lblTypes)))
                                                                        .addComponent(jLabel3))
                                                                .addGap(0, 0, Short.MAX_VALUE))))
                                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                                .addGap(0, 0, Short.MAX_VALUE)
                                                .addComponent(lblCookie)))
                                .addContainerGap())
        );
        layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                                .addContainerGap()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(layout.createSequentialGroup()
                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel1)
                                                        .addComponent(lblName))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel2)
                                                        .addComponent(lblTypes))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(jLabel3)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(jScrollPane1))
                                        .addGroup(layout.createSequentialGroup()
                                                .addComponent(imgSprite)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(jLabel4)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(cboType, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(btnChange)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 50, Short.MAX_VALUE)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(lblCookie)
                                .addContainerGap())
        );

        pack();
    }

    private void handleBtnChangeClick(ActionEvent e) {
        new RetrieveRandomPokemonSwingWorker().execute();
    }

    private void setNumPokemonSeen(int num) {
        lblCookie.setText("You've seen " + num + " Pokémon so far!");
    }

    private void setPokemon(Pokemon pkm) {
        lblName.setText(pkm.getName());
        lblTypes.setText(pkm.getTypes());
        txtAbout.setText(pkm.getDexEntry());

        String url = "http://localhost:3000/images/" + pkm.getSprite();
        try {
            imgSprite.setIcon(new ImageIcon(new URL(url)));
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    private class RetrieveRandomPokemonSwingWorker extends SwingWorker<Pokemon, Void> {

        private final String type;

        public RetrieveRandomPokemonSwingWorker() {
            btnChange.setEnabled(false);
            cboType.setEnabled(false);
            imgSprite.setIcon(defaultImage);

            this.type = cboType.getSelectedItem().toString();
        }

        @Override
        protected Pokemon doInBackground() throws Exception {
            if (type.equals("Any")) {
                return API.getInstance().getRandomPokemon();
            } else {
                return API.getInstance().getRandomPokemonOfType(new TypeQuery(type));
            }
        }

        @Override
        protected void done() {
            try {
                Pokemon pkm = get();
                int callCount = API.getInstance().getCallCount();
                setPokemon(pkm);
                setNumPokemonSeen(callCount);

            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }

            btnChange.setEnabled(true);
            cboType.setEnabled(true);
        }
    }
}
