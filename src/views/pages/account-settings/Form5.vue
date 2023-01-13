<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <div v-if="!doneCard">
      <h2 class="mb-3">
        Кредит
      </h2>
      <v-card-text>
        <v-row align="center">
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="zeroPayment"
              dense
              label="Первоначальный взнос"
              outlined
              required
              @input="$v.zeroPayment.$touch()"
              @blur="$v.zeroPayment.$touch()"
              :error-messages="zeroPaymentError"
            ></v-text-field>
          </v-col>

          <v-col
            class="d-flex"
            cols="12"
            sm="3"
          >
            <v-select
              v-model="selectedMonth"
              :items="[1,2,3,4,5,6]"
              label="Месяцы"
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
            sm="3"
          >
            <v-select
              v-model="selectedPercent"
              :items="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
              label="Проценты"
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-checkbox
              v-model="checkDate"
              label="Выбрать прошлую дату"
            >
            </v-checkbox>
            <v-menu
              v-if="checkDate"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="creditDate"
                  label="Дата выдачи "
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="creditDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <table-for-price
          v-if="showTable"
          :data="priceForMonth"
        ></table-for-price>
        <v-btn
          color="primary"
          class="me-3 mt-4"
          @click="save()"
        >
          Сохранить
        </v-btn>
      </v-card-text>
    </div>
    <div
      v-else
      class="d-flex justify-center align-content-center"
    >
      <div class="text-center">
        <h2>Сохранение прошло успешно</h2>
        <div>
          <v-btn
            color="primary"
            class="me-3 mt-4"
            @click="ExportFile()"
          >
            Скачать документ
          </v-btn>
          <v-btn
            color="primary"
            class="me-3 mt-4"
            @click="$router.push({name: 'dashboard'})"
          >
            Перейти в список
          </v-btn>
<!--                   <v-btn-->
<!--                     color="primary"-->
<!--                     class="me-3 mt-4"-->
<!--                     @click="newCredit()"-->
<!--                   >-->
<!--                     Заново-->
<!--                   </v-btn>-->
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import TableForPrice from '@/components/table/TableForPrice'
import {
  WidthType,
  BorderStyle,
  Document,
  Paragraph,
  Packer,
  TextRun, AlignmentType, Table, TableRow, TableCell,
} from 'docx'
import { saveAs } from 'file-saver'
import { validationMixin } from 'vuelidate'
import { numeric, required } from 'vuelidate/lib/validators'

export default {
  name: 'Form5',
  components: {
    TableForPrice,
    // eslint-disable-next-line vue/no-unused-components
    WidthType,
    BorderStyle,
    Document,
    Paragraph,
    Packer,
    TextRun,
    saveAs,
  },
  mixins: [validationMixin],
  validations: {
    zeroPayment: { required, numeric },
  },
  data: () => ({
    checkDate: false,
    selectedMonth: null,
    selectedPercent: 10,
    priceForMonth: [],
    percentPrice: '',
    dateRange: '',
    menu: false,
    creditDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    brother: '',
    showTable: false,
    creditData: {},
    monthForPay: ['Первый месяц', 'Второй месяц', 'Третий месяц', 'Четвертый месяц', 'Пятый месяц', 'Шестой месяц'],
    zeroPayment: '',
    icons: {
      mdiAlertOutline,
      mdiCloudUploadOutline,
    },
    device: {},
  }),
  computed: {
    doneCard() {
      this.showTable = false
      return this.$store.state.profiles.doneCard
    },
    zeroPaymentError() {
      const errors = []
      if (!this.$v.zeroPayment.$dirty) return errors
      !this.$v.zeroPayment.numeric && errors.push('Только цифры')
      !this.$v.zeroPayment.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  watch: {
    selectedMonth(event) {
      this.selectedMonth = event
      this.device = this.$store.state.profiles.deviceId
      this.brother = this.$store.state.profiles.brother
      this.calculator(this.device.devicePrice, event)
    },
    selectedPercent() {
      this.calculator(this.device.devicePrice, this.selectedMonth)
    },
    creditDate() {
      this.calculator(this.device.devicePrice, this.selectedMonth)
    },
  },
  created() {
    this.device = this.$store.state.profiles.deviceId
    this.brother = this.$store.state.profiles.brother
  },
  beforeDestroy() {
    this.$store.state.profiles.doneCard = false
  },
  methods: {
    save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$store.dispatch('postForm5', this.creditData)
    },
    ExportFile() {
      const doc = new Document({ sections: [] })
      const month = []
      // eslint-disable-next-line array-callback-return
      this.priceForMonth.map(i => {
        const td = new TableCell({
          width: {
            size: 4505,
            type: WidthType.DXA,
          },
          children: [new Paragraph({ text: String(i.percent) })],
        })
        month.push(td)
      })
      const cell = []
      this.priceForMonth.map(i => {
        const tr = new TableRow({
          children: [
            new TableCell({
              width: {
                size: 4505,
                type: WidthType.DXA,
              },
              children: [new Paragraph({
                text: new Date(i.date).toLocaleString('ru', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              })],
            }),
            new TableCell({
              width: {
                size: 4505,
                type: WidthType.DXA,
              },
              children: [new Paragraph({ text: String(i.division) })],
            }),
            new TableCell({
              width: {
                size: 4505,
                type: WidthType.DXA,
              },
              children: [new Paragraph({ text: '' })],
            }),
            new TableCell({
              width: {
                size: 4505,
                type: WidthType.DXA,
              },
              children: [new Paragraph({ text: '' })],
            }),
            new TableCell({
              width: {
                size: 4505,
                type: WidthType.DXA,
              },
              children: [new Paragraph({ text: '' })],
            }),
          ],
        })
        cell.push(tr)
      })
      const tableHeader = new Table({
        columnWidths: [4505, 4505],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: 'Дата погашения' })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: 'Сумма взноса' })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: 'Дата факт. погашения' })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: 'Сумма взноса' })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: 'Подпись' })],
              }),
            ],
          }),
        ],
      })
      const table = new Table({
        columnWidths: [4505, 4505],
        rows: cell,
      })

      const tableDevice = new Table({
        columnWidths: [4505, 4505],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Марка и модель',
                      bold: true,
                    }),
                  ],
                })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Память',
                      bold: true,
                    }),
                  ],
                })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({
                  children: [
                    new TextRun({
                      text: 'IMEI CODE',
                      bold: true,
                      allCaps: true,
                    }),
                  ],
                })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Стоимость',
                      bold: true,
                    }),
                  ],
                })],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: this.device.deviceModel })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: this.device.deviceMemory })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: this.device.deviceImei })],
              }),
              new TableCell({
                width: {
                  size: 4505,
                  type: WidthType.DXA,
                },
                children: [new Paragraph({ text: String(this.device.devicePrice) })],
              }),
            ],
          }),
        ],
      })

      doc.addSection({
        styles: {
          paragraph: {
            spacing: {
              size: 18,
            },
          },
        },
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Договор купли-продажи телефона с рассрочкой платежа',
                bold: true,
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'г.Бишкек',
                break: 2,
              }),
              new TextRun({
                text: `\t \t \t \t \t \t \t \t \t${new Date(this.creditDate).toLocaleString('ru', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Индивидуальный предприниматель Сыдыгалиева Венера Нарынбековна, действующая на основании Добровольного патента на занятие предпринимательской деятельностью №ДПЭ 90414-003/22 от 14.02.2022.г., именуемый(ая) в дальнейшем "Продавец", с одной стороны, и гражданин Кыргызской Республики "${this.$store.state.profiles.profileId.fullName}", паспорт серии:"${this.$store.state.profiles.profileId.passportSeries}", выдан: "${this.$store.state.profiles.profileId.passportDepartment}", дата выдачи_"${this.$store.state.profiles.profileId.passportDate}", тел:_"${this.$store.state.profiles.profileId.phone}", место работы_"${this.$store.state.profiles.profileId.workAddress}", проживающий(ая) по адре-су: "${this.$store.state.profiles.profileId.factAddress}", прописанный(ая) по адресу: "${this.$store.state.profiles.profileId.passportAddress}", именуемый(ая) в дальнейшем "Покупатель", с другой стороны, совместно именуемые «Стороны», заключили настоящий Договор купли-продажи телефона с рассрочкой платежа (далее по тексту – Договор) о нижеследующем:
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '1. ПРЕДМЕТ ДОГОВОРА',
                allCaps: true,
                bold: true,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '1.1.  Продавец  обязуется  передать товар и относящиеся к нему документы  в  собственность  Покупателя, а Покупатель  обязуется осмотреть товар, принять и оплатить его на условиях, установленных настоящим договором.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1.2. Сведения о продаваемом товаре:' }),
            ],
          }),
          tableDevice,
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '2. СТОИМОСТЬ ТОВАРА И ПОРЯДОК ОПЛАТЫ',
                allCaps: true,
                bold: true,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '2.1. Стоимость товара составляет ______________________________________________________________________ сом.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2.2. Оплата производится путем внесения наличных денежных средств в кассу Продавца.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `2.2.1. Покупатель вносит в кассу Продавца предоплату в размере ${this.zeroPayment}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `2.2.2. Оставшуюся сумму в размере ${this.percentPrice}сом Покупатель оплачивает в порядке и сроки, предусмотренные Графиком погашения.` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `2.3. Договор заключается на срок до ${new Date(this.dateRange).toLocaleString('ru', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} или полного погашения стоимости товара со стороны Покупателя.`,
              }),
            ],
          }),
          tableHeader,
          table,
          new Paragraph({
            children: [
              new TextRun({ text: `Доп.лица "${this.brother.brotherType}: ${this.brother.fullName}" тел номер ${this.brother.phoneNumber}`, break: 1 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '3. ПРАВА И ОБЯЗАННОСТИ СТОРОН', break: 1, bold: true, allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.1. Продавец обязуется:', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.1.1. При внесении в кассу Продавца предоплату в соответствии с п 2.2.1. настоящего Договора, передать Покупателю товар в необходимом количестве и ассортименте.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.1.2. Передать товар надлежащего качества.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.2. Покупатель обязуется:', bold: true }),
            ],
          }),
          new Paragraph({ text: '3.2.1. Оплатить товар в установленные настоящим договором сроки.' }),
          new Paragraph({ text: '3.2.2. Предоставить продавцу дополнительную информацию (сведения) о себе и о близких родственниках путем заполнения Дополнительных сведений о покупателе товара. ' }),
          new Paragraph({ text: '3.2.3. Незамедлительно уведомлять Продавца об изменении адреса, реквизитов и обо всех других обстоятельствах, связанных с надлежащим исполнением своих обязательств, а также принимать все меры по их устранению.' }),
          new Paragraph({ text: '3.2.4. По первому требованию Продавца, в случае неисполнения условий настоящего договора, вернуть товар Продавцу в технически исправном состоянии.' }),
          new Paragraph({ text: '3.2.5. В течение действия настоящего Договора предпринимать все меры для бережного использования товара. ' }),
          new Paragraph({ text: '3.2.6. В связи с отсутствием прав собственности на товар у Покупателя, не продавать и не закладывать товар третьим лицам, до полного исполнения обязательств по настоящему договору' }),
          new Paragraph({ text: '3.2.7. Восстановить, либо предоставить равноценную замену товара, в случае порчи, либо уничтожения товара.' }),
          new Paragraph({ text: '3.2.8. До полного исполнения обязательств по настоящему договору, в качестве залога оставить паспорт и всю документацию телефона с коробкой у Продавца.' }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.3. Продавец имеет право:', bold: true }),
            ],
          }),
          new Paragraph({ text: '3.3.1. Создавать и устанавливать на товар собственные аккаунты, без предоставления доступа к их использованию   Покупателем. ' }),
          new Paragraph({ text: '3.3.2. В случае если Покупатель не производит в установленный договором срок, очередной платеж за проданный ему в рассрочку товар, согласно Графика погашения, а также при других существенных нарушений условий Договора со стороны Покупателя, Продавец вправе:' }),
          new Paragraph({ text: '  \t3.3.2.1. Отказаться от исполнения настоящего Договора и расторгнуть настоящий договор в одностороннем  порядке.' }),
          new Paragraph({ text: '  \t3.3.2.2. Потребовать возврата Покупателем проданного товара Продавцу. При возврате Продавец получает Товар по текущей скупочной цене настоящего телефона' }),
          new Paragraph({ text: '  \t3.3.2.3. Осуществить блокировку товара, путем блокировки установленного собственного аккаунта _____________ ознакомлен(а). ' }),
          new Paragraph({ text: '  \t3.3.2.4. С даты изъятия товара у Покупателя предоставить 15 (пятнадцать) календарных дней для добровольного  полного погашения задолженности Покупателем перед Продавцом.' }),
          new Paragraph({ text: '3.3.3. В случае уклонения Покупателем от контакта с Продавцом, и/или от выполнения условий настоящего  договора, разместить имеющуюся информацию о Покупателе в социальных сетях по своему усмотрению, с целью поиска Покупателя и требования выполнить условия настоящего договора ____________ ознакомлен(а).' }),
          new Paragraph({ text: '3.3.4. До полного исполнения обязательств по настоящему договору, хранить у себя все документы на товар, коробку от товара и передать их Покупателю только после полного исполнения обязательств по данному договору.' }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.4. Покупатель имеет право:', bold: true }),
            ],
          }),
          new Paragraph({ text: '3.4.1. Пользоваться товаром в личных целях.' }),
          new Paragraph({ text: '3.4.2. Досрочно осуществить полное или частично досрочное погашение задолженности согласно настоящего договора.' }),
          new Paragraph({ text: '3.4.3. После полного исполнения обязательств, согласно настоящего договора, потребовать удалить аккаунты Продавца на товаре.' }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '4. ПЕРЕХОД ПРАВА СОБСТВЕННОСТИ', bold: true, allCaps: true }),
            ],
          }),
          new Paragraph({ text: '4.1. До полного исполнения условий настоящего договора, право собственности на товар принадлежит Продавцу. ' }),
          new Paragraph({ text: '4.2. Право собственности на товар, переходит от Продавца к Покупателю с момента полной оплаты, оставшейся стоимости товара, указанной в п. 2.2.2. настоящего Договора. ' }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '5. ОТВЕТСТВЕННОСТЬ СТОРОН', bold: true, allCaps: true }),
            ],
          }),
          new Paragraph({ text: '5.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему договору Стороны несут ответственность в соответствии с действующим законодательством Кыргызской Республики.' }),
          new Paragraph({ text: '5.2. В случае продажи, либо оставления в залог/заклад третьим лицам, в течении действия настоящего Договора, Покупатель несет ответственность согласно Уголовного кодекса Кыргызской Республики ______________ ознакомлен(а).' }),
          new Paragraph({ text: '5.3.В случае возврата товара Покупателем Продавцу, по каким либо причинам, первоначальный взнос не возвращается.' }),
          new Paragraph({ text: '5.4. В случае несвоевременной оплаты (просрочки) платежа Покупателем, предусмотрен штраф в размере 2000 сом.' }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '6. ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ', bold: true, allCaps: true }),
            ],
          }),
          new Paragraph({ text: '6.1. Споры и разногласия, которые могут возникнуть при исполнении настоящего договора, будут по возможности разрешаться путем переговоров между сторонами.' }),
          new Paragraph({ text: '6.2. В случае невозможности разрешения споров путем переговоров они подлежат разрешению в суде в порядке,установленном действующим законодательством Кыргызской Республики.' }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '7. ПОДПИСИ СТОРОН', bold: true, allCaps: true, break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '\tПродавец:', break: 1 }),
              new TextRun({ text: '\t \t \t \t \t \tПродавец:' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '______________________/_____________               ___________________________/_____________ ', break: 1 }),
            ],
          }),
        ],
      })
      this.saveDocumentToFile(doc, 'Заявление.docx')
    },
    saveDocumentToFile(doc, fileName) {
      const mimeType = 'application/vnd.openxmlformatsofficedocument.wordprocessingml.document'
      Packer.toBlob(doc).then(blob => {
        const docblob = blob.slice(0, blob.size, mimeType)
        saveAs(docblob, fileName)
      })
    },
    calculator(price, month) {
      this.showTable = true
      this.priceForMonth = []
      const zero = price - this.zeroPayment
      const percentPlus = (zero / 100) * this.selectedPercent
      this.percentPrice = zero + percentPlus
      const division = Math.floor(((zero + percentPlus) / month))
      const foo2 = []
      const foo = []
      for (let i = 1; i <= month; i++) {
        foo2.push(division)
        foo.push(i)
        this.priceForMonth.push({ division })
      }
      const dateRange = []
      foo.map(i => {
        const date = new Date(this.creditDate)
        dateRange.push(new Date(date.setMonth(date.getMonth() + i)).toISOString())
      })
      this.dateRange = dateRange[dateRange.length - 1]
      const monthCreditDbList = []
      // eslint-disable-next-line array-callback-return
      this.priceForMonth.map((i, idx) => {
        // eslint-disable-next-line no-param-reassign
        i.percent = this.monthForPay[idx]
        i.date = dateRange[idx]
        const data = {
          comment: '',
          payDate: dateRange[idx],
          debtClosedDate: '',
          percent: this.selectedPercent,
          debt: i.division,
          countMonth: foo[idx],
          statusType: 'WAIT',
        }
        monthCreditDbList.push(data)
      })
      this.creditData = {
        deviceId: this.device.id,
        monthCreditDbList,
        registrationDate: this.checkDate ? new Date(this.creditDate).toISOString() : this.toIsoString(new Date()),
        zeroPayment: Number(this.zeroPayment),
      }
    },
    toIsoString(date) {
      const tzo = -date.getTimezoneOffset()
      const pad = function (num) {
        return (num < 10 ? '0' : '') + num
      }

      return `${date.getFullYear()
      }-${pad(date.getMonth() + 1)
      }-${pad(date.getDate())
      }T${pad(date.getHours())
      }:${pad(date.getMinutes())
      }:${pad(date.getSeconds())
      }.${pad(Math.floor(Math.abs(tzo) / 60))}0Z`
    },
  },
}
</script>

<style scoped>

</style>
