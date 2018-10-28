
export interface Prototype{
  clone():Prototype;
}

export class Movie implements Prototype {

  private title: string;
  private year: number;

  public constructor(title: string = undefined, year: number = undefined)
  {
      if(title === undefined || year === undefined) {
          //do the expensive creation
      } else {
          this.title = title;
          this.year = year;
      }
  }

  clone(): Movie {
      return new Movie(this.title, this.year);
  }
}

const expansiveMovie:Movie = new Movie();
const cheapMovie = expansiveMovie.clone();
