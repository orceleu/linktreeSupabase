import { supabase } from "../supabase/supabaseInstance";
interface ReseauxUrl {
  id: string;
  is_active: boolean;
  position: number;
  icon: string;
  reseaux_url: string;
  click: number;
  for_link_url: string;
}
interface ComponentType {
  id: string;
  is_active: boolean;
  position: number;
  type: string;
  texte: string;
  photo_url: string;
  click: number;
  url: string;

  for_link_url: string;
}

//SELECTION DE DONNEE********************************************************

const selectData = async (table: string, eq: string, eq_to: string) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(eq, eq_to)
    .order("position", { ascending: true });

  if (error) console.log(error);
  if (data) return data;
};

//UPDATE***********************************************************************

const updateReseauxPosition = async (dataForUpdate: ReseauxUrl[]) => {
  dataForUpdate.map(
    async (update) => {
      const { data, error } = await supabase

        .from("users_reseaux") // Remplacez par le nom de votre table
        .update({ position: update.position }) // Remplacez par la colonne et la valeur à mettre à jour
        .eq("reseaux_url", update.reseaux_url);
    } // Critères de sélection pour l'enregistrement à mettre à jour
  );
};
const updateComponentPosition = async (dataForUpdate: ComponentType[]) => {
  dataForUpdate.map(
    async (update) => {
      const { data, error } = await supabase

        .from("component") // Remplacez par le nom de votre table
        .update({ position: update.position }) // Remplacez par la colonne et la valeur à mettre à jour
        .eq("id", update.id);
    } // Critères de sélection pour l'enregistrement à mettre à jour
  );
};
const updateComponentCardText = async (dataForUpdate: ComponentType[]) => {
  dataForUpdate.map(
    async (update) => {
      const { data, error } = await supabase

        .from("component") // Remplacez par le nom de votre table
        .update({ texte: update.texte }) // Remplacez par la colonne et la valeur à mettre à jour
        .eq("url", update.url);
    } // Critères de sélection pour l'enregistrement à mettre à jour
  );
};
const updateComponentUrl = async (dataForUpdate: ComponentType[]) => {
  dataForUpdate.map(
    async (update) => {
      const { data, error } = await supabase

        .from("component") // Remplacez par le nom de votre table
        .update({ url: update.url }) // Remplacez par la colonne et la valeur à mettre à jour
        .eq("id", update.id);
    } // Critères de sélection pour l'enregistrement à mettre à jour
  );
};
const updateActiveUrl = async (dataForUpdate: ComponentType[]) => {
  dataForUpdate.map(
    async (update) => {
      const { data, error } = await supabase

        .from("component") // Remplacez par le nom de votre table
        .update({ is_active: update.is_active }) // Remplacez par la colonne et la valeur à mettre à jour
        .eq("id", update.id);
    } // Critères de sélection pour l'enregistrement à mettre à jour
  );
};

//DELETE****************************************************************************

const deleteComponentUrl = async (id: string) => {
  const { data, error } = await supabase

    .from("component") // Remplacez par le nom de votre table
    .delete() // Remplacez par la colonne et la valeur à mettre à jour
    .eq("id", id);
  if (error) console.log(error);
  if (data) console.log(data);
};

//ADD****************************************************************************

const addReseauxLink = async (reseauxdata: ReseauxUrl[]) => {
  const { data, error } = await supabase
    .from("users_reseaux")
    .insert(reseauxdata);
  if (error) console.log(error);
  console.log(data);
};
const addComponent = async (componentToAdd: ComponentType[]) => {
  const { data, error } = await supabase
    .from("component")
    .insert(componentToAdd);
  if (error) console.log(error);
  console.log(data);
};

export {
  selectData,
  addReseauxLink,
  updateComponentPosition,
  updateComponentCardText,
  updateComponentUrl,
  updateActiveUrl,
  deleteComponentUrl,
  addComponent,
};
