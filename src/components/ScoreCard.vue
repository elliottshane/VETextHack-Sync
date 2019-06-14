
<template>
<v-container>
    <v-layout
      text-xl-Left
      wrap
    >
    <v-flex xs12>
  <div>
   
   
       <div class="text-center">
       <v-chip
       class="ma-2"
        x-large
       >
            <v-avatar  class="teal">{{results.team1Calls}}</v-avatar>
           {{this.team1Phone}}
          </v-chip>
         </div>
      <span class="display-2 font-weight-bold mb-3">{{results.team1Name}} - SMS</span>
  
    <v-progress-linear
      color="warning"
      height="20"
      :value="results.team1SMSScore"
    ></v-progress-linear>
    
      <span class="display-2 font-weight-bold mb-3">{{results.team1Name}} - Judges</span>
 
    <v-progress-linear
      color="warning"
      height="20"
      :value="results.team1Score"
    ></v-progress-linear>
       <div class="text-xl-center">
       <v-chip  align="top">
            <v-avatar  class="teal">{{results.team2Calls}}</v-avatar>
            {{this.team2Phone}}
          </v-chip>
         </div> 
  
      <span class="display-2 font-weight-bold mb-3">{{results.team2Name}} - SMS</span>
  <v-progress-linear
      color="error"
      height="20"
      :value="results.team2SMSScore"
    ></v-progress-linear>
          <span class="display-2 font-weight-bold mb-3">{{results.team2Name}} - Judges</span>
    <v-progress-linear
      color="error"
      height="20"
      :value="results.team2Score"
    ></v-progress-linear>
    
  </div>
    </v-flex>
    </v-layout>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            
            results:{
                team1Name:"Team 1",
                team1Calls:0,
                team1Score:65,
                team1SMSScore:75,
                team2Name:"Team 2",
                team2Calls:3,
                team2SMSScore:50,
                team2Score:80
            }
        }
    },
    computed:{
       team1Phone(){
         return this.$store.getters.team1Phone;
       },
      team2Phone(){
         return this.$store.getters.team2Phone;
       }
    },
    mounted(){
      console.log('phone: ',this.team1Phone)

    }
}

</script>

<style>
.v-chip .v-avatar {
    height: 42px!important;
    width: 42px!important;

}
.v-avatar {
    color:white
}

.v-chip .v-chip__content {
    height: 42px;
}
.v-chip {
    font-size: 28px;
}

</style>
