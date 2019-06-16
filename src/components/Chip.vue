<template>

  <div id="chart">
      <apexchart type=bar height=350 :options="chartOptions" :series="series" />
 <v-layout
      text-xl-Left
      wrap
    >
    <v-flex xs6>
 <div id="text-label" class="text-center" style="font:48px">
   <h1>
       {{results.team1Name}}
</h1>
       <v-chip
       class="ma-2"
        x-large
       >
            <v-avatar  class="teal">{{results.team1Calls}}</v-avatar>
           {{this.team1Phone | phone }}
          </v-chip>
         </div>
    </v-flex>
     <v-flex xs6>
  <div class="text-xl-center">
    <h1>
    {{results.team2Name}}
    </h1>
       <v-chip  align="top">
            <v-avatar  class="teal">{{results.team2Calls}}</v-avatar>
            {{this.team2Phone | phone}}
          </v-chip>
         </div> 
     </v-flex>
 </v-layout>
    </div>
     
</template>

<script>

export default {
    data() {
        return {
        
        
        series: [{name:'SMS',
          data: [0,0]
        },{name:'Judge',data:[0,0]}],
       
        chartOptions: { 
           chart: {
                height: 350,
                type: 'bar',
                stacked: true,
                  offsetX: 10,
                sparkline: {
                  enabled: false
                },
                toolbar:{
                  show:false,
                  
                }  
            },
          plotOptions: {
            bar: {
              horizontal: true,
               dataLabels: {
                position: 'top'
              }
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '25px',
            },
          },
          yaxis:{
            labels: {
              show: true,
              align: 'left',
              offsetX: 15,
              style:{
                fontSize: '55px'
              }
            },
            axisBorder: {
                show: false,
                color: '#78909C',
                offsetX: 0,
                offsetY: 0
            },
          },
          legend: {
            show: true,
             style: {
              fontSize: '50px',
            },
          },
          xaxis: {
            categories: ['Team1', 'Team2'
            ],
            labels: {
              show: false,
              style:{
                fontSize: '55px'
              }
            },
            axisBorder: {
              show: true,
            },
             axisTicks: {
            show: false,
             }
          }
        },
       
     }
},
computed:{
      team1Phone(){
         return this.$store.getters.team1Phone;
       },
      team2Phone(){
         return this.$store.getters.team2Phone;
       },
      results(){
         return this.$store.getters.results;
       },
      team1SMSScore(){
         return this.$store.getters.team1SMSScore;
       },
      team2SMSScore(){
         return this.$store.getters.team2SMSScore;
       },
      team1Score(){
         return this.$store.getters.team1Score;
       },
      team2Score(){
         return this.$store.getters.team2Score;
       }
    },
    watch:{
      results(value){
          console.log('watch-results',value);
         
      },
      team1SMSScore(value){
          console.log('watch-team1SMSScore',value);
          this.series = [{name:'SMS',
          data: [this.team1SMSScore,this.team2SMSScore]
        },{name:'Judge',data:[this.team1Score,this.team2Score]}]
         
      },
      team2SMSScore(value){
          console.log('watch-team2SMSScore',value);
          this.series = [{name:'SMS',
          data: [this.team1SMSScore,this.team2SMSScore]
        },{name:'Judge',data:[this.team1Score,this.team2Score]}]
      },
      team1Score(value){
          console.log('watch-team1Score',value);
          this.series = [{name:'SMS',
          data: [this.team1SMSScore,this.team2SMSScore]
        },{name:'Judge',data:[this.team1Score,this.team2Score]}]
         
      },
      team2Score(value){
          console.log('watch-team2Score',value);
          this.series = [{name:'SMS',
          data: [this.team1SMSScore,this.team2SMSScore]
        },{name:'Judge',data:[this.team1Score,this.team2Score]}]
      }
    },
    mounted(){
     
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

.flex.xs6 {
    padding-left: 10px;
}
h1 {
  padding-left: 10px;
}
</style>
