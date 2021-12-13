export const Calculator1 = (mbti1_1, mbti1_2, mbti1_3, mbti1_4, mbti1_5) => {
    let totalScore = 0;

    if(mbti1_1 === true){
      totalScore=totalScore+1;
    }else if(mbti1_2 === true){
      totalScore=totalScore+5;
    }else if(mbti1_3 === true){
      totalScore=totalScore+13;
    }else if(mbti1_4 === true){
      totalScore=totalScore+20;
    }else if(mbti1_5 === true){
      totalScore=totalScore+25;
    }

    return totalScore;
};

export const Calculator2 = (mbti2_1, mbti2_2, mbti2_3, mbti2_4, mbti2_5) => {
    let totalScore = 0;

    if(mbti2_1 === true){
    totalScore=totalScore+25;
    }else if(mbti2_2 === true){
    totalScore=totalScore+20;
    }else if(mbti2_3 === true){
    totalScore=totalScore+13;
    }else if(mbti2_4 === true){
    totalScore=totalScore+5;
    }
    else if(mbti2_5 === true){
      totalScore=totalScore+1;
      }
    return totalScore;
};

export const Calculator3 = (mbti3_1, mbti3_2, mbti3_3, mbti3_4, mbti3_5) => {
    let totalScore = 0;

    if(mbti3_1 === true){
      totalScore=totalScore+1;
    }else if(mbti3_2 === true){
        totalScore=totalScore+5;
      }else if(mbti3_3 === true){
        totalScore=totalScore+13;
      }else if(mbti3_4 === true){
        totalScore=totalScore+20;
      }else if(mbti3_5 === true){
        totalScore=totalScore+25;
      }

    return totalScore;
};

export const Calculator4 = (mbti4_1, mbti4_2, mbti4_3, mbti4_4, mbti4_5) => {
    let totalScore = 0;

    if(mbti4_1 === true){
        totalScore=totalScore+25;
      }else if(mbti4_2 === true){
        totalScore=totalScore+20;
      }else if(mbti4_3 === true){
        totalScore=totalScore+13;
      }else if(mbti4_4 === true){
        totalScore=totalScore+5;
      }else if(mbti4_5 === true){
        totalScore=totalScore+1;
      }
  
      return totalScore;
};