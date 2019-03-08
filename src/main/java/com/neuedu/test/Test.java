package com.neuedu.test;

import com.neuedu.util.StringUtil;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.POIXMLTextExtractor;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.openxml4j.exceptions.OpenXML4JException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.xmlbeans.XmlException;
import org.springframework.util.FileCopyUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.text.DecimalFormat;

public class Test {
    public static void main(String[] args) {
        String path = "E:\\path\\feiq\\Recv Files\\流管实战\\会议纪要_海淀公安分局_20181104_1.docx";
        File file = new File(path);
        try {
            String buffer;
            if (path.endsWith(".doc")) {
                InputStream is = null;
                is = new FileInputStream(new File(path));
                WordExtractor ex = new WordExtractor(is);
                buffer = ex.getText();
                System.out.println(buffer);
                is.close();
            } else if (path.endsWith("docx")) {
                OPCPackage opcPackage = POIXMLDocument.openPackage(path);
                POIXMLTextExtractor extractor = new XWPFWordExtractor(opcPackage);
                buffer = extractor.getText();
                System.out.println(buffer);
                extractor.close();
            } else {
                System.out.println("此文件不是word文件！");
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XmlException e) {
            e.printStackTrace();
        } catch (OpenXML4JException e) {
            e.printStackTrace();
        }
    }
}
