import React from 'react';
import { Sky, Environment, Text } from '@react-three/drei';
import Player from './Player';
import Exhibit from './Exhibit';
import { HistoricalStatue, GeopoliticsStatue, SportsStatue, InfrastructureStatue } from './Statues';

function Wall({ position, args, rotation = [0, 0, 0] }) {
  return (
    <mesh receiveShadow castShadow position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#1f1f1f" roughness={0.85} metalness={0.0} />
    </mesh>
  );
}

export default function Museum({ onSelectExhibit, isViewing }) {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="city" />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        castShadow 
        position={[10, 10, 5]} 
        intensity={1.5} 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Player (First Person Camera) */}
      <Player active={!isViewing} />

      {/* Museum Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a3018" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#e5e5e5" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* OUTER PERIMETER WALLS (forming the cross) */}
      {/* North Room Outer */}
      <Wall position={[0, 5, -30]} args={[20, 10, 1]} />
      <Wall position={[-10, 5, -20]} args={[1, 10, 20]} />
      <Wall position={[10, 5, -20]} args={[1, 10, 20]} />
      
      {/* South Room Outer */}
      <Wall position={[0, 5, 30]} args={[20, 10, 1]} />
      <Wall position={[-10, 5, 20]} args={[1, 10, 20]} />
      <Wall position={[10, 5, 20]} args={[1, 10, 20]} />

      {/* East Room Outer */}
      <Wall position={[30, 5, 0]} args={[1, 10, 20]} />
      <Wall position={[20, 5, -10]} args={[20, 10, 1]} />
      <Wall position={[20, 5, 10]} args={[20, 10, 1]} />

      {/* West Room Outer */}
      <Wall position={[-30, 5, 0]} args={[1, 10, 20]} />
      <Wall position={[-20, 5, -10]} args={[20, 10, 1]} />
      <Wall position={[-20, 5, 10]} args={[20, 10, 1]} />

      {/* INNER HUB WALLS (with 6 unit doorways: X/Z from -3 to 3) */}
      {/* North Inner Wall */}
      <Wall position={[-6.5, 5, -10]} args={[7, 10, 1]} />
      <Wall position={[6.5, 5, -10]} args={[7, 10, 1]} />
      
      {/* South Inner Wall */}
      <Wall position={[-6.5, 5, 10]} args={[7, 10, 1]} />
      <Wall position={[6.5, 5, 10]} args={[7, 10, 1]} />
      
      {/* East Inner Wall */}
      <Wall position={[10, 5, -6.5]} args={[1, 10, 7]} />
      <Wall position={[10, 5, 6.5]} args={[1, 10, 7]} />

      {/* West Inner Wall */}
      <Wall position={[-10, 5, -6.5]} args={[1, 10, 7]} />
      <Wall position={[-10, 5, 6.5]} args={[1, 10, 7]} />

      {/* DOORWAY SIGNS */}
      <Text position={[0, 8, -9.4]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
        Исторические события
      </Text>
      <Text position={[0, 8, 9.4]} rotation={[0, Math.PI, 0]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
        Крупные спортивные события
      </Text>
      <Text position={[9.4, 8, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
        Глобальная геополитика
      </Text>
      <Text position={[-9.4, 8, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
        Современная инфраструктура
      </Text>

      {/* EXHIBITS */}
      {/* NORTH ROOM (Center: 0, y, -20) */}
      <HistoricalStatue position={[0, 0, -20]} />
      <Exhibit position={[0, 3, -29.4]} rotation={[0, 0, 0]} 
        title="Конец Холодной войны" 
        imageUrl="/photos/cold_war.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Конец Холодной войны', 
          date: '1989–1991',
          keyFigures: 'Михаил Горбачёв, Борис Ельцин, Джордж Буш-старший.',
          mainPoints: [
            'Холодная война завершилась распадом противостояния между СССР и США.',
            'Символом перемен стало падение Берлинской стены в 1989 году.',
            'В 1991 году СССР прекратил существование; важную роль сыграли Беловежские соглашения 8 декабря 1991 года.',
            'Мир перестал быть биполярным: США остались главным мировым центром силы, а Россия стала правопреемницей СССР.'
          ],
          photos: ['/photos/cold_war.jpg'],
          embedUrl: "https://www.youtube.com/embed/3yJp8XSZddU"
        })} 
      />
      <Exhibit position={[-9.4, 3, -20]} rotation={[0, Math.PI / 2, 0]} 
        title="Октябрь 1993 года" 
        imageUrl="/photos/october.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Октябрь 1993 года', 
          date: 'сентябрь — октябрь 1993',
          keyFigures: 'Борис Ельцин, Александр Руцкой, Руслан Хасбулатов.',
          mainPoints: [
            'Это был острый политический и конституционный кризис между президентом и Верховным Советом.',
            'Противостояние закончилось вооружёнными столкновениями в Москве.',
            '4 октября 1993 года Дом Советов, также известный как Белый дом, был обстрелян танками.',
            'После кризиса была принята новая Конституция РФ: голосование прошло 12 декабря 1993 года, а Конституция вступила в силу 25 декабря.'
          ],
          photos: ['/photos/october.jpg'],
          embedUrl: "https://www.youtube.com/embed/8nJy475we2Y"
        })} 
      />
      <Exhibit position={[9.4, 3, -20]} rotation={[0, -Math.PI / 2, 0]} 
        title="Рынок и «шоковая терапия»" 
        imageUrl="/photos/market_economy.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Рынок и «шоковая терапия»', 
          date: 'начало 1990-х',
          keyFigures: 'Егор Гайдар, Анатолий Чубайс, Борис Ельцин.',
          mainPoints: [
            'После распада СССР Россия переходила от плановой экономики к рыночной.',
            '2 января 1992 года началась либерализация цен: государство перестало жёстко контролировать большинство цен.',
            'Реформы включали приватизацию, развитие частного бизнеса и свободной торговли.',
            'Последствия были тяжёлыми: инфляция, падение уровня жизни, обесценивание сбережений.',
            'В этот период усилилось имущественное расслоение и появился слой крупных бизнесменов — олигархов.'
          ],
          photos: ['/photos/market_economy.jpg'],
          embedUrl: "https://www.youtube.com/embed/2mBPNHMh68k"
        })} 
      />

      {/* EAST ROOM (Center: 20, y, 0) */}
      <GeopoliticsStatue position={[20, 0, 0]} />
      <Exhibit position={[29.4, 3, 0]} rotation={[0, -Math.PI / 2, 0]} 
        title="БРИКС" 
        imageUrl="/photos/brics.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'БРИКС', 
          keyFigures: 'лидеры России, Китая, Индии, Бразилии, ЮАР и новых стран-участниц.',
          mainPoints: [
            'БРИКС — объединение крупных развивающихся стран.',
            'Изначально в него входили Бразилия, Россия, Индия, Китай и ЮАР.',
            'Сейчас состав расширился: к объединению присоединились новые страны, включая Египет, Эфиопию, Иран, ОАЭ, Саудовскую Аравию и Индонезию.',
            'БРИКС позиционируется как площадка для многополярного мира и альтернатива доминированию западных стран и G7.',
            'Для России БРИКС важен как инструмент внешней политики и экономического сотрудничества.'
          ],
          photos: ['/photos/brics.jpg'],
          embedUrl: "https://www.youtube.com/embed/BMC26r79ewU"
        })} 
      />
      <Exhibit position={[20, 3, -9.4]} rotation={[0, 0, 0]} 
        title="ВТО" 
        imageUrl="/photos/vto.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'ВТО', 
          date: '2012',
          keyFigures: 'российская переговорная группа, руководство ВТО.',
          mainPoints: [
            'Россия официально вступила во Всемирную торговую организацию 22 августа 2012 года.',
            'Переговоры длились около 18 лет.',
            'Цель вступления — получить более стабильный доступ к мировым рынкам.',
            'Но членство в ВТО также означало обязательства: снижение пошлин, открытие рынка для иностранных товаров и услуг.',
            'Для экономики это было одновременно возможностью и вызовом.'
          ],
          photos: ['/photos/vto.jpg', '/photos/vto_2.jpg'],
          embedUrl: "https://www.youtube.com/embed/noJv52YK0Pw"
        })} 
      />
      <Exhibit position={[20, 3, 9.4]} rotation={[0, Math.PI, 0]} 
        title="Крым 2014" 
        imageUrl="/photos/crimea.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Крым 2014', 
          date: 'март 2014',
          keyFigures: 'Владимир Путин, власти Крыма, руководство Украины.',
          mainPoints: [
            'В 2014 году после политического кризиса на Украине в Крыму прошёл референдум.',
            'По итогам референдума 16 марта власти России приняли Крым и Севастополь в состав РФ.',
            'Украина, США, ЕС и многие другие государства не признали это решение и называют его аннексией. ЕС прямо заявил, что не признаёт присоединение Крыма к России.',
            'После этого против России были введены санкции. США начали санкционные меры уже в марте 2014 года.',
            'Это событие резко ухудшило отношения России с Западом.'
          ],
          photos: ['/photos/crimea.jpg'],
          embedUrl: "https://www.youtube.com/embed/fsxFOU6nhVc"
        })} 
      />

      {/* SOUTH ROOM (Center: 0, y, 20) */}
      <SportsStatue position={[0, 0, 20]} />
      <Exhibit position={[9.4, 3, 20]} rotation={[0, -Math.PI / 2, 0]} 
        title="Олимпиада в Сочи 2014" 
        imageUrl="/photos/sochi.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Олимпиада в Сочи 2014', 
          date: 'февраль 2014',
          event: 'XXII зимние Олимпийские игры.',
          mainPoints: [
            'Олимпиада в Сочи стала крупнейшим спортивным проектом России начала XXI века.',
            'Были построены стадионы, дороги, гостиницы и спортивная инфраструктура.',
            'Церемония открытия показывала историю и культуру России.',
            'В церемонии была девочка Люба, её образ исполняли юные гимнастки.',
            'Из запоминающихся моментов — одно из олимпийских колец не раскрылось во время церемонии открытия.'
          ],
          photos: ['/photos/sochi.jpg'] 
        })} 
      />
      <Exhibit position={[-9.4, 3, 20]} rotation={[0, Math.PI / 2, 0]} 
        title="Чемпионат мира по футболу 2018" 
        imageUrl="/photos/fifa.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Чемпионат мира по футболу 2018', 
          date: 'лето 2018',
          keyFigures: 'сборная России, Джанни Инфантино.',
          mainPoints: [
            'Россия впервые принимала чемпионат мира по футболу.',
            'Матчи проходили в 11 городах.',
            'Турнир привлёк много иностранных болельщиков и стал важным имиджевым событием.',
            'Сборная России неожиданно дошла до четвертьфинала.',
            'Самый запоминающийся матч — победа над Испанией 1 июля 2018 года после серии пенальти.'
          ],
          photos: ['/photos/fifa.jpg'],
          embedUrl: "https://www.youtube.com/embed/oFMbxkLGuSo"
        })} 
      />

      {/* WEST ROOM (Center: -20, y, 0) */}
      <InfrastructureStatue position={[-20, 0, 0]} />
      <Exhibit position={[-29.4, 3, -4]} rotation={[0, Math.PI / 2, 0]} 
        title="АЭС / атомная энергетика" 
        imageUrl="/photos/apes.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'АЭС / атомная энергетика', 
          organization: '«Росатом».',
          mainPoints: [
            'Атомная энергетика — одна из важных отраслей современной России.',
            'Россия не только использует АЭС внутри страны, но и строит атомные станции за рубежом.',
            'Это часть технологического и экспортного потенциала России.',
            'Возможный пример для выступления — плавучая АЭС «Академик Ломоносов».',
            'Она находится в Певеке на Чукотке и была введена в промышленную эксплуатацию 22 мая 2020 года.'
          ],
          photos: ['/photos/apes.jpg'],
          embedUrl: "https://www.youtube.com/embed/iBqhyvPTKfk"
        })} 
      />
      <Exhibit position={[-29.4, 3, 4]} rotation={[0, Math.PI / 2, 0]} 
        title="Москва-Сити" 
        imageUrl="/photos/city.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Москва-Сити', 
          date: 'активное развитие — 2000–2010-е годы',
          theme: 'деловой центр Москвы.',
          mainPoints: [
            'Москва-Сити — символ экономического роста 2000-х годов.',
            'Это деловой район с небоскрёбами, офисами, апартаментами и торговыми площадями.',
            'Строительство началось ещё в 1990-е, но особенно активно район развивался в 2000–2010-е.',
            'Самые известные башни — «Федерация», «ОКО», «Империя», «Эволюция».',
            'Москва-Сити стал визуальным символом современной Москвы.'
          ],
          photos: ['/photos/city.jpg'],
          embedUrl: "https://www.youtube.com/embed/eSE-FefnLkE"
        })} 
      />
      <Exhibit position={[-20, 3, -9.4]} rotation={[0, 0, 0]} 
        title="Атомный ледокол" 
        imageUrl="/photos/ледоколы.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'Атомный ледокол', 
          organization: '«Росатомфлот».',
          theme: 'Арктика и Северный морской путь.',
          mainPoints: [
            'Россия обладает крупнейшим атомным ледокольным флотом.',
            'Атомные ледоколы нужны для движения судов по Северному морскому пути.',
            'Северный морской путь важен как транспортная артерия между Европой и Азией через Арктику.',
            'Современные ледоколы проекта 22220 — «Арктика», «Сибирь», «Урал» и другие.',
            'Они показывают значение Арктики для экономики, транспорта и геополитики России.'
          ],
          photos: ['/photos/ледоколы.jpg'],
          embedUrl: "https://www.youtube.com/embed/0i1g5bR3Bp0"
        })} 
      />
      <Exhibit position={[-20, 3, 9.4]} rotation={[0, Math.PI, 0]} 
        title="ВКС — Воздушно-космические силы" 
        imageUrl="/photos/вкс.jpg"
        onClick={() => onSelectExhibit({ 
          title: 'ВКС — Воздушно-космические силы', 
          date: '2015',
          keyFigures: 'Владимир Путин, Сергей Шойгу.',
          mainPoints: [
            'ВКС России были созданы в 2015 году.',
            'Они появились в результате объединения Военно-воздушных сил и войск воздушно-космической обороны.',
            'ВКС отвечают за авиацию, противовоздушную оборону, противоракетную оборону и космические войска.',
            'Новый вид войск начал выполнять задачи с 1 августа 2015 года.',
            'Создание ВКС было связано с необходимостью единого управления воздушной и космической обороной.'
          ],
          photos: ['/photos/вкс.jpg', '/photos/вкс_2.jpg'],
          embedUrl: "https://www.youtube.com/embed/NvajMjJ3KNo"
        })} 
      />
    </>
  );
}
