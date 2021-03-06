import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';
import { AlunosComponent } from './alunos.component';

import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { getRenderedText } from '@angular/core/src/render3';
@Component({
  selector: 'metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
   constructor(private alunoService: AlunoService) {}

alunos: Aluno[];
   atualizarAluno(aluno: Aluno): void {
      this.alunoService.atualizar(aluno);
      
   }

   medias: number[]=[];
   necessitados: Aluno[]=[];
   allnecessitados: String;
   boolean: boolean;
   
   
   ngOnInit(): void {
      this.alunoService.getAlunos()
      .then(alunos => this.alunos = alunos)
      .catch(erro => alert(erro));
        this.necessitados=[];
        this.allnecessitados="";
   }
   calcularMedia(){
    for(let i in this.alunos){
       this.medias.push(this.mediaIndividual(this.alunos[i]));
    }

   }
   mediana(){
      this.medias.sort();
      var mediana=0;
      if(this.medias.length%2==0){
         
         mediana = (this.medias[(this.medias.length/2)-1] + this.medias[(this.medias.length/2)])/2;
      }
      else{
         mediana=this.medias[(this.medias.length-1)/2];
      }
      return mediana;
   }

   
   mediaIndividual(aluno: Aluno){
      var ma = 0;
      var mpa = 0;
      var mana = 0;
      
      for(let j in aluno.metas){
      if(aluno.metas[j]=="MANA"){
         mana++;
        }
      else if(aluno.metas[j]=="MPA"){
           mpa++;
          }
      else if(aluno.metas[j]=="MA"){
           ma++;
          }
         }
         var total=ma+mana+mpa;
         var pma = ma/(total);
         var pmpa = mpa/(total);
         var pmana = mana/(total);
         var media = 0;
         if(pmana==0){
            if(pma>=0.9){
               media=10;
            }
            else if(pma>=0.8){
               media=9.5;
            }
            else if(pma>=0.7){
               media=9;
            }
            else if(pma>=0.5){
            media=8.5;
            
            }
            else if(pma=>0.4){
               media=8;
            }
            else if(pma=>0.2){
               media=7.5;
            }
            else{
               media=7;
            }
         }
         else if(pma>=0.9 || pmpa>=0.9){
               media=6.5;
         
         }
         else if(pma>=0.7 || pmpa>=0.7){
            media=5.5;
         }
         else if(pma>=0.6 || pmpa>=0.6){
            media=5.0;
         }
         else if(pma>=0.5 || pmpa>=0.5){
            media=4.5;
         }
         else{
            media=4;
         }
         
         this.medias.push(media);
         
              return media;
         }

        
   gerarNecessitados() : void{
      for(let i in this.alunos){
          if(this.mediaIndividual(this.alunos[i]) < this.mediana()){
             this.necessitados.push(this.alunos[i]);
          }      
      }
      for(let i in this.necessitados){
         this.allnecessitados=this.allnecessitados+(this.necessitados[i].nome + " - "+ "Média: " + 
         this.mediaIndividual(this.necessitados[i]) +  "\n" );
      }
      if(this.allnecessitados.length==0){
         alert("Nenhum aluno está abaixo da média da turma");
      }
      else{
         this.allnecessitados= this.necessitados.length + " alunos estão abaixo da média da turma :" +"\n" +   this.allnecessitados;
      alert(this.allnecessitados);
      this.allnecessitados="";
      this.necessitados= [];  
   }

   }
  


   

      gerarAnaliseFinal() : void{
      var pormedia = 0;
      var final = 0;
      var repfalta = 0;
      let necessitados : String[] = [];
      var falta = 0;
      
      for( let i in this.alunos){
         if(this.alunos[i].metas['requisitos']==null ||
          this.alunos[i].metas['gerDeConfiguracao']== null|| 
          this.alunos[i].metas['gerDeProjetos']==null ||
          this.alunos[i].metas['testes']==null){
            falta++;
         }
         else if(this.alunos[i].metas['requisitos']=="MANA" ||
          this.alunos[i].metas['gerDeConfiguracao']=="MANA" || 
          this.alunos[i].metas['gerDeProjetos']=="MANA" ||
          this.alunos[i].metas['testes']=="MANA"){
             final++;
             this.necessitados.push(this.alunos[i]);
            }
         else{
            pormedia++;
         }
         var pfinal = 0;
         var pmedia = 0;
         pfinal = final/(pormedia+final)*100;
         pmedia = pormedia/(pormedia+final)*100;
}
    if(falta>0){
       alert(falta + " alunos ainda estão com metas não preenchidas");
    }
    else{
      alert(pfinal+"% dos alunos foram para final"+ "("+ final + ")" + "\n" + pmedia + "% dos alunos passaram por média" +"("+ pormedia + ")" );   
      this.necessitados=[];
   }
}
   
 

}

   


